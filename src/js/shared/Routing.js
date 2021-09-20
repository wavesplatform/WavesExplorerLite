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
            one: (id) => `${root}/tx/${id}`
        },
        leases: {
            one: (id) => `${root}/leases/${id}`
        },
        addresses: {
            one: (address, tab) => {
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
