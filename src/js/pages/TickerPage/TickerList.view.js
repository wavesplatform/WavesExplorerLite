import React from 'react';
import PropTypes from 'prop-types';

import {TickerListItem} from './TickerListItem.view';

export class TickerList extends React.Component {
    static propTypes = {
        tickers: PropTypes.arrayOf(PropTypes.object).isRequired
    };

    render() {
        return (
            <table className="nodes table-sm-transform">
                <thead>
                    <tr>
                        <th className="pair">Pair</th>
                        <th className="asset">Asset</th>
                        <th className="priceAsset">Price Asset</th>
                        <th className="volume">Volume 24h</th>
                        <th className="low">Low 24h</th>
                        <th className="high">High 24h</th>
                        <th className="close">Last price</th>
                        <th className="website">Website</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.tickers.map((ticker, index) => {
                        return (<TickerListItem key={index} ticker={ticker} />);
                    })}
                </tbody>
            </table>
        );
    }
}
