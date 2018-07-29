import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class LastBlockListItem extends React.PureComponent {
    static propTypes = {
        block: PropTypes.object.isRequired,
        baseUrl: PropTypes.string.isRequired
    };

    render() {
        const block = this.props.block;
        return (
            <div className="grid panel-row block-img-handler">
                <div className="block-img grid-item-fixed"></div>
                <div>
                    <div className="line">Block <Link to={`${this.props.baseUrl}/blocks/${block.height}`}>{block.height}</Link> contains <span className="bold">{block.transactionCount}</span> transactions</div>
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
