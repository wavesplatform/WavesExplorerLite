import React from 'react';
import PropTypes from 'prop-types';
import MoneyClass from '../../shared/Money';
import CurrencyRef from '../CurrencyRef';

export const MoneyInfo = ({value}) => {
    return <span>{value.formatAmount(true, true)} <CurrencyRef currency={value.currency}/></span>

};

MoneyInfo.propTypes = {
    value: PropTypes.instanceOf(MoneyClass).isRequired
};
