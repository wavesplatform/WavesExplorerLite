const TransactionTypes = Object.freeze({
    1: {title: 'Genesis', cssClassName: 'genesis'},
    2: {title: 'Payment', cssClassName: 'asset-transfer'},
    3: {title: 'Asset Issue', cssClassName: 'asset-issue'},
    4: {title: 'Asset Transfer', cssClassName: 'asset-transfer'},
    5: {title: 'Asset Reissue', cssClassName: 'asset-reissue'},
    6: {title: 'Asset Burn', cssClassName: 'asset-burn'},
    7: {title: 'Exchange', cssClassName: 'exchange'},
    8: {title: 'Lease', cssClassName: 'lease'},
    9: {title: 'Lease Cancel', cssClassName: 'lease-cancel'},
    10: {title: 'Create Alias', cssClassName: 'create-alias'},
    11: {title: 'Mass Payment', cssClassName: 'mass-payment'},
    12: {title: 'Data', cssClassName: 'data'},
    13: {title: 'Script', cssClassName: 'script'},
    14: {title: 'Sponsorship', cssClassName: 'sponsorship'},
    15: {title: 'Asset Script', cssClassName: 'asset-script'},
    16: {title: 'Script Invocation', cssClassName: 'script-invocation'},
    17: {title: 'Update Asset Info', cssClassName: 'update-asset-info'}
});

export const TransactionDirections = {
    INCOMING: 'incoming',
    OUTGOING: 'outgoing'
};

const getMapping = type => {
    return TransactionTypes[parseInt(type)];
};

export const typeToCssClass = type => {
    const mapping = getMapping(type);

    if (!mapping)
        return '';

    return mapping.cssClassName;
};

export const typeToTitle = type => {
    const mapping = getMapping(type);

    if (!mapping)
        return 'Unknown';

    return mapping.title;
};

export const directionToCssClass = direction => {
    switch (direction) {
        case TransactionDirections.INCOMING:
            return 'in';

        case TransactionDirections.OUTGOING:
            return 'out';

        default:
            return '';
    }
};
