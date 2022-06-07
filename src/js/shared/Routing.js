import {ethAddress2waves} from '@waves/node-api-js'
import {getNetworkByte} from './utils'
import ethTxId2waves from "@waves/node-api-js/cjs/tools/transactions/ethTxId2waves";


export const routeParamsBuilder = (networks) => {
    const regex = networks.map(network => network.networkId).join('|');

    return {
        networkId: `:networkId(${regex})?`,
        blockHeight: ':height',
        transactionId: ':transactionId',
        leaseId: ':leaseId',
        address: ':address',
        alias: ':alias',
        assetId: ':assetId',
        tab: ':tab'
    };
};

export const routeBuilder = (networkId) => {
    const root = networkId ? `/${networkId}` : '';
    const blocks = `${root}/blocks`;

    return {
        root,
        nodes: {
            list: `${root}/nodes`
        },
        peers: {
            list: `${root}/peers`
        },
        blocks: {
            list: blocks,
            one: (height) => `${blocks}/${height}`
        },
        transactions: {
            one: (id) => {
                let txId
                id.startsWith('0x') && id.length == 66 ? txId = ethTxId2waves(id) : txId = id
                return `${root}/tx/${txId}`
            }
        },
        leases: {
            one: (id) => `${root}/leases/${id}`
        },
        leases: {
            one: (id) => `${root}/leases/${id}`
        },
        addresses: {
            one: (address, tab) => {
                if (address.startsWith('0x') && address.length === 42) address = ethAddress2waves(address, getNetworkByte(networkId))

                let result = `${root}/address/${address}`;

                if (tab)
                    result += `/${tab}`;

                return result
            }
        },
        aliases: {
            one: (alias) => `${root}/aliases/${alias}`
        },
        assets: {
            one: (assetId) => `${root}/assets/${assetId}`
        },
        faucet: `${root}/faucet`,
        converters: `${root}/converters`
    };
};
