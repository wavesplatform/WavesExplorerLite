import {ApiClientService} from './ApiClientService';

const FAUCET_TRANSACTIONS_COUNT = 20;

export class FaucetService extends ApiClientService {
    constructor(transactionTransformerService, configurationService, networkId) {
        super(configurationService, networkId);

        this.transformer = transactionTransformerService;
    }

    loadTransactions = () => {
        const faucet = this.configuration().faucet;
        if (!faucet)
            throw new Error(`Faucet is not configured for network ${this.networkId}`);

        const api = this.getApi();

        return api.transactions.address(faucet.address, FAUCET_TRANSACTIONS_COUNT)
            .then(transactionResponse => transactionResponse.data[0])
            .then(transactions => transactions.filter(tx => tx.type === 4))
            .then(transactions => this.transformer.transform(transactions));
    }
}
