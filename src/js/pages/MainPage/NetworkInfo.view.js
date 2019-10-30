import React from 'react';
import PropTypes from 'prop-types';
import Question from '../../../images/question-14.svg';
import {CAPTIONS} from '../../services/InfoService';
import Tooltip from '../../components/Tooltip';

const Caption = ({caption}) => {
    if (caption !== CAPTIONS.BLOCK_DELAY)
        return <label>{caption}:</label>;

    return (<div className="label-with-icon">
        <label>{caption}:</label>
        <div className="icon question" data-for="avg-time-tooltip" data-tip="Per last 10k blocks"></div>
        <Tooltip id="avg-time-tooltip"/>
    </div>);
};

export class NetworkInfo extends React.PureComponent {
    static propTypes = {
        info: PropTypes.object.isRequired
    };

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
