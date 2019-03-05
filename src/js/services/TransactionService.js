import {api} from '../shared/api/NodeApi';
import {ApiClientService} from './ApiClientService';

export class TransactionService extends ApiClientService {
    constructor(transactionTransformerService, configurationService, networkId) {
        super(configurationService, networkId);

        this.transformer = transactionTransformerService;
    }

    loadTransaction = (id) => {
        return this.getApi().transactions.info(id).then(infoResponse => {
            return this.transformer.transform(infoResponse.data);
        });
    };

    loadUnconfirmed = () => {
        return this.getApi().transactions.unconfirmed().then(response => {
            return this.transformer.transform(response.data);
        })
    };
}
