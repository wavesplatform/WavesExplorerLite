import groupBy from 'lodash/groupBy';

import Alias from '../shared/Alias';
import Currency from '../shared/Currency';
import Money from '../shared/Money';
import {ApiClientService} from './ApiClientService';

export class AddressService extends ApiClientService {
    constructor(transactionTransformerService, currencyService, configurationService, networkId) {
        super(configurationService, networkId);

        this.transformer = transactionTransformerService;
        this.currencyService = currencyService;
    }

    loadBalance = (address) => {
        return this.getApi().addresses.details(address).then(data => {
            return {
                regular: Money.fromCoins(data.regular, Currency.TN).toString(),
                generating: Money.fromCoins(data.generating, Currency.TN).toString(),
                available: Money.fromCoins(data.available, Currency.TN).toString(),
                effective: Money.fromCoins(data.effective, Currency.TN).toString()
            };
        });
    };

    loadTransactions = (address, limit, after) => {
        return this.getApi().transactions.address(address, limit, after).then(transactionsResponse => {
            return this.transformer.transform(transactionsResponse);
        });
    };

    loadRawAliases = (address) => {
        return this.getApi().addresses.aliases(address);
    };

    transformAndGroupAliases = (rawAliases) => {
        const lines = rawAliases.map(item => Alias.fromString(item).alias);
        const grouped = groupBy(lines, item => item.toUpperCase().charAt(0));
        return Object.keys(grouped).sort().map(letter => ({
            letter,
            aliases: grouped[letter].sort()
        }));
    };

    loadAliases = (address) => {
        return this.loadRawAliases(address).then(rawAliases => this.transformAndGroupAliases(rawAliases));
    };

    loadAssets = async (address) => {
        const api = this.getApi().assets
        const balanceResponse = await api.balance(address)
        const details = (await api.detailsMultiple(balanceResponse.balances.map(({assetId}) => assetId)))
            .reduce((acc, val) => ({...acc, [val.assetId]: val}), {})
        return balanceResponse.balances.map(item => {

            // TODO: remove when token is renamed
            if (item.assetId === VostokToWavesEnterprise.id) {
                item.issueTransaction.name = VostokToWavesEnterprise.name;
                item.issueTransaction.description = VostokToWavesEnterprise.description;
            }
            const currency = new Currency({
                id: details[item.assetId].originTransactionId,
                displayName: details[item.assetId].name,
                precision: details[item.assetId].decimals
            });

            this.currencyService.put(currency);

            const amount = Money.fromCoins(item.balance, currency);

            return {
                id: item.assetId,
                name: currency.toString(),
                amount: amount.formatAmount()
            };
        });
    };

    loadNftTokens = async (address, limit, after) => {
        const balanceResponse = await this.getApi().assets.nft(address, limit, after)
        return balanceResponse.map(item => {
            return {
                id: item.id || item.assetId,
                name: item.name,
            };
        });
    };

    loadData = (address) => {
        return this.getApi().addresses.data(address);
    };

    loadScript = (address) => {
        return this.getApi().addresses.scriptInfo(address);
    };

    loadScriptMeta = (address) => {
        return this.getApi().addresses.scriptMeta(address);
    };

    validate = (address) => {
        return this.getApi().addresses.validate(address).then(validateResponse => validateResponse.valid);
    };
}
