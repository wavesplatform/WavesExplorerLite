import React from 'react';
import PropTypes from 'prop-types';

import BlockRef from '../../components/BlockRef';

export class LastBlockListItem extends React.PureComponent {
    static propTypes = {
        block: PropTypes.object.isRequired,
        finalizedHeight: PropTypes.number
    };

    static defaultProps = {
        finalizedHeight: 1
    };

    render() {
        const block = this.props.block;
        const isFinalized = this.props.finalizedHeight >= block.height;
        const emptyClassName = block.transactions > 0 ? '' : ' empty-block';
        const rowClassName = 'grid panel-row block-img-handler' + emptyClassName;
        const blockImageClassName = `block-img grid-item-fixed${isFinalized ? ' finalized' : ''}`;

        return (
            <div className={rowClassName}>
                <div className={blockImageClassName}></div>
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
