import React from 'react';
import PropTypes from 'prop-types';

import BlockRef from '../../components/BlockRef';

export class LastBlockListItem extends React.PureComponent {
    static propTypes = {
        block: PropTypes.object.isRequired
    };

    render() {
        const block = this.props.block;
        const emptyClassName = block.transactions > 0 ? '' : ' empty-block';
        const rowClassName = 'grid panel-row block-img-handler' + emptyClassName;

        return (
            <div className={rowClassName}>
                <div className="block-img grid-item-fixed"></div>
                <div>
                    <div className="line">Block <BlockRef height={block.height}/> contains <span className="bold">{block.transactions}</span> transactions</div>
                    <div className="line no-wrap">
                        <label>{block.id ? `ID: ${block.id}` : `Signature: ${block.signature}`}</label>
                    </div>
                </div>
                <div className="divider divider-dashed md-hide sm-show grid-item-fixed"></div>
                <div className="md-hide sm-show grid-item-fixed">
                    <div className="line"><label>{block.timestamp.time}</label></div>
                    <div className="line"><label>{block.timestamp.date}</label></div>
                </div>
            </div>
        );
    }
}
