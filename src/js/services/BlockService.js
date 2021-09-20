import groupBy from 'lodash/groupBy';

import Money from '../shared/Money';
import Currency from '../shared/Currency';
import {ApiClientService} from './ApiClientService';

const transformBlock = block => {
    if (block.totalFee) {
        block.totalFee = Money.fromCoins(block.totalFee, Currency.WAVES);
    }

    if (block.reward) {
        block.reward = Money.fromCoins(block.reward, Currency.WAVES);
    }

    if (block.desiredReward) {
        block.desiredReward = Money.fromCoins(block.desiredReward, Currency.WAVES);
    }

    return block;
};

export class BlockService extends ApiClientService {
    constructor(transactionTransformerService, infoService, configurationService, networkId) {
        super(configurationService, networkId);

        this.transformer = transactionTransformerService;
        this.infoService = infoService;
    }

    loadSequence = (from, to) => {
        return this.getApi().blocks.headers.sequence(from, to).then(blocksResponse => {
            const blocks = blocksResponse.map(block => {
                return {
                    id: block.id,
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
            this.getApi().blocks.at(height).then(response => {
                    block = transformBlock(response);
                    return this.transformer.transform(block.transactions);
                }
            )]).then(results => {
            const maxHeight = results[0];
            const transactions = results[1];

            transactions.forEach(tx => {
                if (tx.type === 19) {
                    if (!!tx.dApp) tx.type = 16
                    if (!!tx.recipient) tx.type = 4
                }
            })

            const groupedTransactions = transactions ? groupBy(transactions, 'type') : {};

            return {
                maxHeight,
                block,
                groupedTransactions
            };
        });
    };
}
