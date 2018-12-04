import React from 'react';
import PropTypes from 'prop-types';

import AddressRef from '../shared/AddressRef';
import BlockRef from '../shared/BlockRef';

export default class BlockListItem extends React.Component {
    static propTypes = {
        block: PropTypes.object.isRequired
    };

    render() {
        const {block} = this.props;
        const rowClassName = block.transactions > 0 ? '' : 'empty-block';

        return (
            <tr className={rowClassName}>
                <td data-label="№ / Timestamp" className="block-img-handler nowrap">
                    <div className="block-img sm-hide"></div>
                    <div className="line no-wrap"><BlockRef height={block.height} /></div>
                    <div className="line no-break"><label>{block.timestamp.time}, {block.timestamp.date}</label></div>
                </td>
                <td data-label="Base Target">
                    <div className="line bold">{block.baseTarget}</div>
                </td>
                <td data-label="Generator / Signature">
                    <div className="line no-wrap"><AddressRef address={block.generator}/></div>
                    <div className="line no-wrap"><label>{block.signature}</label></div>
                </td>
                <td data-label="TXs">
                    <div className="line">{block.transactions}</div>
                </td>
            </tr>
        );
    }
}
