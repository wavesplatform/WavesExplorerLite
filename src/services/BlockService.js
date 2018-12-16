import groupBy from 'lodash/groupBy';

import {api} from '../shared/NodeApi';

export class BlockService {
    constructor(transactionTransformerService, infoService) {
        this.transformer = transactionTransformerService;
        this.infoService = infoService;
    }

    loadSequence = (from, to) => {
        return api.blocks.headers.sequence(from, to).then(blocksResponse => {
            const blocks = blocksResponse.data.map(block => {
                return {
                    height: block.height,
                    timestamp: block.timestamp,
                    baseTarget: block['nxt-consensus']['base-target'],
                    generator: block.generator,
                    signature: block.signature,
                    transactions: block.transactionCount
                };
            }).reverse();

            return blocks;
        });
    };

    loadBlock = (height) => {
        let block;

        return Promise.all([this.infoService.loadHeight(),
            api.blocks.at(height).then(blockResponse => {
                block = blockResponse.data;
                return this.transformer.transform(block.transactions);
            }
        )]).then(results => {
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
