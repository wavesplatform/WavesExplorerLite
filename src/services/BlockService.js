import groupBy from 'lodash/groupBy';

import {ApiClientService} from './ApiClientService';

export class BlockService extends ApiClientService {
    constructor(transactionTransformerService, infoService, configurationService) {
        super(configurationService);

        this.transformer = transactionTransformerService;
        this.infoService = infoService;
    }

    loadSequence = (from, to) => {
        return this.getApi().blocks.headers.sequence(from, to).then(blocksResponse => {
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
            this.getApi().blocks.at(height).then(blockResponse => {
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
