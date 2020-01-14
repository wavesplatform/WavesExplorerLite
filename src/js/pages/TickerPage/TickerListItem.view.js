import React from 'react';
import PropTypes from 'prop-types';

export class TickerListItem extends React.Component {
    static propTypes = {
        ticker: PropTypes.object.isRequired
    };

    render() {
        const {ticker} = this.props;
        return (
            <tr>
                <td data-label="pair">
                    <div className="line no-wrap"><img className="logo" src={require("../../../images/turtlecap/"+ticker.logo)} /><a href={"https://privatematcher.blackturtle.eu/matcher/orderbook/"+ticker.assetId+"/"+ticker.priceAssetId} target="_blank">{ticker.asset}/{ticker.priceAsset}</a></div>
                </td>
                <td data-label="asset">
                    <div className="line"><a href={"http://statistics.turtlenetwork.eu/assets/"+ticker.assetId} target="_blank">{ticker.asset}</a></div>
                </td>
                <td data-label="priceAsset">
                    <div className="line"><a href={"http://statistics.turtlenetwork.eu/assets/"+ticker.priceAssetId}  target="_blank">{ticker.priceAsset}</a></div>
                </td>
                <td data-label="volume">
                    <div className="line">{ticker.volume}</div>
                </td>
                <td data-label="low">
                    <div className="line">{ticker.low}</div>
                </td>
                <td data-label="high">
                    <div className="line">{ticker.high}</div>
                </td>
                <td data-label="close">
                    <div className="line">{ticker.close}</div>
                </td>
                <td data-label="website">
                    <div className="line"><a href={ticker.url} target="_blank">Web {ticker.asset}</a></div>
                </td>
            </tr>
        );
    }
}
