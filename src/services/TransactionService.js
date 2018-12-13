import {api} from '../shared/NodeApi';

export class TransactionService {
    constructor(transactionTransformerService) {
        this.transformer = transactionTransformerService;
    }

    loadTransaction = (id) => {
        return api.transactions.info(id).then(infoResponse => {
            return this.transformer.transform(infoResponse.data);
        });
    }
}
