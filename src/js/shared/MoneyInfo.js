import React from 'react';
import PropTypes from 'prop-types';
import MoneyClass from './Money';
import CurrencyRef from './CurrencyRef';

const MoneyInfo = ({value}) => (
    <span>{value.formatAmount(true, true)} <CurrencyRef currency={value.currency}/></span>
);

MoneyInfo.propTypes = {
    value: PropTypes.instanceOf(MoneyClass).isRequired
};

export default MoneyInfo;
