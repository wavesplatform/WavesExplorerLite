import React from 'react';
import PropTypes from 'prop-types';
import { TOOLTIP_ID } from '../../shared/constants';
import { CAPTIONS } from '../../services/InfoService';
import Tooltip from '../../components/Tooltip';
import BlockRef from '../../components/BlockRef';

const Caption = ({caption}) => {
    if (caption !== CAPTIONS.BLOCK_DELAY)
        return <label>{caption}:</label>;

    return (<div className="label-with-icon">
        <label>{caption}:</label>
        <div className="icon question" data-for={TOOLTIP_ID} data-tip="Per last 10k blocks"></div>
    </div>);
};

export class NetworkInfo extends React.PureComponent {
    static propTypes = {
        info: PropTypes.object.isRequired
    };

    renderValue = (caption, value) => {
        if ((caption === CAPTIONS.CURRENT_HEIGHT || caption === CAPTIONS.FINALIZED_HEIGHT) && Number.isFinite(value)) {
            return <BlockRef height={value} className="no-accent"/>;
        }

        return value;
    };

    render() {
        return (
            <div className="grid grid-wrap">
                {Object.entries(this.props.info).map(entry => {
                    return (<div key={entry[0]} className="column-sm-6">
                        <div className="line"><Caption caption={entry[0]} /></div>
                        <div className="line">{this.renderValue(entry[0], entry[1])}</div>
                    </div>);
                })}
            </div>
        );
    }
}
