import React from 'react';
import PropTypes from 'prop-types';

import Currency from '../../shared/Currency';
import AssetRef from '../AssetRef';

export const CurrencyRef = ({currency}) => {
    if (currency === Currency.WAVES)
        return currency.toString();

    return <AssetRef assetId={currency.id} text={currency.toString()} />;
};

CurrencyRef.propTypes = {
    currency: PropTypes.shape({
        id: PropTypes.string
    }).isRequired
};
