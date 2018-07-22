import React from 'react';
import PropTypes from 'prop-types';

export default class BlockListItem extends React.PureComponent {
    static propTypes = {
        block: PropTypes.object.isRequired
    };

    render() {
        const block = this.props.block;
        return (
            <div className="grid panel-row">
                <div className="block-img grid-item-fixed"></div>
                <div>
                    <div className="line">Block <a>{block.height}</a> contains <span className="bold">{block.transactionCount}</span> transactions</div>
                    <div className="line no-wrap"><label>Signature: {block.signature}</label></div>
                </div>
                <div className="divider divider-dashed md-hide sm-show grid-item-fixed"></div>
                <div className="md-hide sm-show grid-item-fixed">
                    <div className="line"><label>{block.time}</label></div>
                    <div className="line"><label>{block.date}</label></div>
                </div>
            </div>
        );
    }
}
