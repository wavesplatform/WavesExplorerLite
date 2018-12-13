import groupBy from 'lodash/groupBy';

import {api} from '../shared/NodeApi';

export class BlockService {
    constructor(transactionTransformerService) {
        this.transformer = transactionTransformerService;
    }

    loadBlock = (height) => {
        let block;

        return Promise.all([
            api.blocks.height().then(heightResponse => {
            return heightResponse.data.height;
        }), api.blocks.at(height).then(blockResponse => {
            block = blockResponse.data;
            return this.transformer.transform(block.transactions);
        })]).then(results => {
            const maxHeight = results[0];
            const transactions = results[1];
            const groupedTransactions = transactions ? groupBy(transactions, 'type') : {};

            return {
                maxHeight,
                block,
                groupedTransactions
            };
        });
    };
}
