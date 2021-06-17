import {ApiClientService} from './ApiClientService';
import {VostokToWavesEnterprise} from '../shared/constants';

const MAX_UNCONFIRMED_TRANSACTIONS = 25;

export class TransactionService extends ApiClientService {
    constructor(transactionTransformerService, configurationService, networkId) {
        super(configurationService, networkId);

        this.transformer = transactionTransformerService;
    }

    loadTransaction = (id) => {
        return this.loadRawTransaction(id).then(tx => {
            // TODO: remove when token is renamed
            if (tx.id === VostokToWavesEnterprise.id) {
                tx.name = VostokToWavesEnterprise.name;
                tx.description = VostokToWavesEnterprise.description;
            }

            return this.transformer.transform(tx);
        });
    };

    loadRawTransaction = (id) => {
        return this.getApi().transactions.info(id);
    };

    loadUnconfirmed = () => {
        return this.getApi().transactions.unconfirmed().then(response => {
            const transactions = response;
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
