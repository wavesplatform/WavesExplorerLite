const TransactionTypes = Object.freeze({
    2: {title: 'Payment', arrowClassName: 'asset-transfer'},
    4: {title: 'Transfer', arrowClassName: 'asset-transfer'},
    7: {title: 'Exchange', arrowClassName: 'exchange'},
    8: {title: 'Leasing', arrowClassName: 'asset-transfer'},
    9: {title: 'Cancel leasing', arrowClassName: 'asset-transfer'},
    11: {title: 'Mass payment', arrowClassName: 'mass-payment'}
});

const getMapping = type => {
    return TransactionTypes[parseInt(type)];
};

export const typeToArrowClass = type => {
    const mapping = getMapping(type);

    if (!mapping)
        return '';

    return mapping.arrowClassName;
};

export const typeToTitle = type => {
    const mapping = getMapping(type);

    if (!mapping)
        return 'Unknown';

    return mapping.title;
};

