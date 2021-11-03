import React from 'react';
import PropTypes from 'prop-types';
import { TOOLTIP_ID } from '../../shared/constants';
import { CAPTIONS } from '../../services/InfoService';
import Tooltip from '../../components/Tooltip';

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

    componentDidUpdate(prevProps) {
        if (this.props.info !== prevProps.info) {
            Tooltip.rebind();
        }
    }

    render() {
        return (
            <div className="grid grid-wrap">
                {Object.entries(this.props.info).map(entry => {
                    return (<div key={entry[0]} className="column-sm-6">
                        <div className="line"><Caption caption={entry[0]} /></div>
                        <div className="line">{entry[1]}</div>
                    </div>);
                })}
            </div>
        );
    }
}
