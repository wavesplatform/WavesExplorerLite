import groupBy from 'lodash/groupBy';

import Money from '../shared/Money';
import Currency from '../shared/Currency';
import {ApiClientService} from './ApiClientService';
import {convertEthTx} from "../shared/utils";

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

    loadBlock = async (height) => {
        let block;

        const maxHeight = await this.infoService.loadHeight();

        const rawBlock = await this.getApi().blocks.at(height)

        block = transformBlock(rawBlock);

        block.transactions = await Promise.all(block.transactions.map(async (tx) => {
            if (tx.type === 18) {
                tx = await this.getApi().transactions.info(tx.id)
                return tx
            } else return tx
        }))

        block.transactions.forEach(tx => {
            if (tx.type === 18) {
                return convertEthTx(tx)
            }
        })

        const transactions = await this.transformer.transform(block.transactions)

        const groupedTransactions = transactions ? groupBy(transactions, 'type') : {};

        return {
            maxHeight,
            block,
            groupedTransactions
        };

    };
}
