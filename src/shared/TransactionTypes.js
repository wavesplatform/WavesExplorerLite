const TransactionTypes = Object.freeze({
    2: {title: 'Payment', cssClassName: 'asset-transfer'},
    3: {title: 'Issue', cssClassName: 'asset-issue'},
    4: {title: 'Transfer', cssClassName: 'asset-transfer'},
    5: {title: 'Reissue', cssClassName: 'asset-reissue'},
    6: {title: 'Burn', cssClassName: 'asset-burn'},
    7: {title: 'Exchange', cssClassName: 'exchange'},
    8: {title: 'Leasing', cssClassName: 'lease'},
    9: {title: 'Cancel leasing', cssClassName: 'lease-cancel'},
    10: {title: 'Create alias', cssClassName: 'create-alias'},
    11: {title: 'Mass payment', cssClassName: 'mass-payment'},
    12: {title: 'Data', cssClassName: 'data'},
});

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

