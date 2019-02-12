import {ApiClientService} from './ApiClientService';
import {faucetApi} from '../shared/FaucetApi';

const FAUCET_TRANSACTIONS_COUNT = 20;

export class FaucetService extends ApiClientService {
    constructor(transactionTransformerService, configurationService, networkId) {
        super(configurationService, networkId);

        this.transformer = transactionTransformerService;
    }

    loadTransactions = () => {
        const faucet = this.getFaucet();

        const api = this.getApi();

        return api.transactions.address(faucet.address, FAUCET_TRANSACTIONS_COUNT)
            .then(transactionResponse => transactionResponse.data[0])
            .then(transactions => transactions.filter(tx => tx.type === 4))
            .then(transactions => this.transformer.transform(transactions));
    };

    requestMoney = (address, captchaToken) => {
        const faucet = this.getFaucet();

        const api = faucetApi(faucet.url);

        return api.requestMoney(address, captchaToken);
    };

    getFaucet = () => {
        const faucet = this.configuration().faucet;
        if (!faucet)
            throw new Error(`Faucet is not configured for network ${this.networkId}`);

        return faucet
    }
}
