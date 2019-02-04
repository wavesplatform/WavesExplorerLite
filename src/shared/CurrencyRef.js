import React from 'react';
import PropTypes from 'prop-types';

import Currency from './Currency';
import AssetRef from './AssetRef';

const CurrencyRef = ({currency}) => {
    if (currency === Currency.WAVES)
        return currency.toString();

    return <AssetRef assetId={currency.id} text={currency.toString()} />;
};

CurrencyRef.propTypes = {
    currency: PropTypes.shape({
        id: PropTypes.string
    }).isRequired
};

export default CurrencyRef;
