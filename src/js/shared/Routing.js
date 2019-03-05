export const routeParamsBuilder = (networks) => {
    const regex = networks.map(network => network.networkId).join('|');

    return {
        networkId: `:networkId(${regex})?`,
        blockHeight: ':height',
        transactionId: ':transactionId',
        address: ':address',
        alias: ':alias',
        assetId: ':assetId'
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
            one: (id) => `${root}/tx/${id}`
        },
        addresses: {
            one: (address) => `${root}/address/${address}`
        },
        aliases: {
            one: (alias) => `${root}/aliases/${alias}`
        },
        assets: {
            one: (assetId) => `${root}/assets/${assetId}`
        },
        faucet: `${root}/faucet`
    };
};
