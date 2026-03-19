import React from 'react';
import PropTypes from 'prop-types';

import EndpointRef from '../../components/EndpointRef';
import TransactionRef from '../../components/TransactionRef';
import BlockRef from '../../components/BlockRef';
import Money from '../../shared/Money';
import Currency from '../../shared/Currency';

export const FinalizationInfo = ({generators, queryHeight, rowClassByIndex}) => {
    const safeGenerators = Array.isArray(generators) ? generators : [];
    const renderBalance = (balance) => {
        if (balance === null || balance === undefined) {
            return '-';
        }

        try {
            return Money.fromCoins(balance, Currency.WAVES).toString();
        } catch (e) {
            return '-';
        }
    };

    return (
        <div>
            <div className="headline finalization-table-title">
                <span className="title medium">Committed Generators</span>
            </div>
            <table className="finalization-list table-sm-transform">
                <thead>
                <tr>
                    <th className="index">Index</th>
                    <th className="generator">Generator</th>
                    <th className="balance">Balance</th>
                    <th className="transaction">Transaction Id</th>
                    <th className="conflict">Conflict endorser height</th>
                </tr>
                </thead>
                <tbody>
                {safeGenerators.map((item, index) => (
                    <tr key={`${item.address}-${item.transactionId}`} className={rowClassByIndex[index] || ''}>
                        <td data-label="Index" className="index">
                            <div className="line no-wrap">{index}</div>
                        </td>
                        <td data-label="Generator" className="generator">
                            <div className="line no-wrap" title={item.address}>
                                <EndpointRef endpoint={item.address} appearance="regular"/>
                            </div>
                        </td>
                        <td data-label="Balance" className="balance">
                            <div className="line no-wrap">{renderBalance(item.balance)}</div>
                        </td>
                        <td data-label="Transaction Id" className="transaction">
                            <div className="line no-wrap" title={item.transactionId}>
                                <TransactionRef txId={item.transactionId} className="no-accent"/>
                            </div>
                        </td>
                        <td data-label="Conflict height" className="conflict">
                            <div className="line no-wrap">
                                {item.conflictHeight ? <BlockRef height={item.conflictHeight}/> : '-'}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

FinalizationInfo.propTypes = {
    queryHeight: PropTypes.number,
    rowClassByIndex: PropTypes.object,
    generators: PropTypes.arrayOf(PropTypes.shape({
        address: PropTypes.string.isRequired,
        balance: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
        transactionId: PropTypes.string.isRequired,
        conflictHeight: PropTypes.number
    })).isRequired
};

FinalizationInfo.defaultProps = {
    queryHeight: null,
    rowClassByIndex: {}
};
