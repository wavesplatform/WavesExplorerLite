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
        return this.getApi().addresses.details(address).then(balanceResponse => {
            const data = balanceResponse.data;
            return {
                regular: Money.fromCoins(data.regular, Currency.WAVES).toString(),
                generating: Money.fromCoins(data.generating, Currency.WAVES).toString(),
                available: Money.fromCoins(data.available, Currency.WAVES).toString(),
                effective: Money.fromCoins(data.effective, Currency.WAVES).toString()
            };
        });
    };

    loadTransactions = (address) => {
        return this.getApi().transactions.address(address).then(transactionsResponse => {
            return this.transformer.transform(transactionsResponse.data[0]);
        });
    };

    loadAliases = (address) => {
        return this.getApi().addresses.aliases(address).then(aliasesResponse => {
            const lines = aliasesResponse.data.map(item => Alias.fromString(item).alias);
            const grouped = groupBy(lines, item => item.toUpperCase().charAt(0));
            return Object.keys(grouped).sort().map(letter => ({
                letter,
                aliases: grouped[letter].sort()
            }));
        });
    };

    loadAssets = (address) => {
        return this.getApi().assets.balance(address).then(balanceResponse => {
            const assets = balanceResponse.data.balances.map(item => {
                const currency = Currency.fromIssueTransaction(item.issueTransaction);
                this.currencyService.put(currency);

                const amount = Money.fromCoins(item.balance, currency);

                return {
                    id: item.assetId,
                    name: currency.toString(),
                    amount: amount.formatAmount()
                };
            });

            return assets;
        });
    };

    loadData = (address) => {
        return this.getApi().addresses.data(address).then(dataResponse => dataResponse.data);
    };

    loadScript = (address) => {
        return this.getApi().addresses.script(address).then(scriptResponse => scriptResponse.data);
    };

    validate = (address) => {
        return this.getApi().addresses.validate(address).then(validateResponse => validateResponse.data.valid);
    };
}
