import {ApiClientService} from './ApiClientService';

const MAX_UNCONFIRMED_TRANSACTIONS = 25;

export class TransactionService extends ApiClientService {
    constructor(transactionTransformerService, configurationService, networkId) {
        super(configurationService, networkId);

        this.transformer = transactionTransformerService;
    }

    loadTransaction = (id) => {
        return this.loadRawTransaction(id).then(tx => {

            return this.transformer.transform(tx);
        });
    };

    loadRawTransaction = (id) => {
        return this.getApi().transactions.info(id).then(response => response.data);
    };

    loadUnconfirmed = () => {
        return this.getApi().transactions.unconfirmed().then(response => {
            const transactions = response.data;
            transactions.sort((a, b) => b.timestamp - a.timestamp);

            const size = transactions.length;
            const sliced = transactions.slice(0, MAX_UNCONFIRMED_TRANSACTIONS);

            return this.transformer.transform(sliced).then(transformed => ({
                size,
                transactions: transformed
            }));
        });
    };
}
