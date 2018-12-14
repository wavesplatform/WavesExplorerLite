import React from 'react';
import PropTypes from 'prop-types';

import ServiceFactory from '../services/ServiceFactory';

import Loader from '../shared/Loader';

export class NetworkInfo extends React.PureComponent {
    static propTypes = {
        info: PropTypes.object.isRequired
    };

    render() {
        return (
            <div className="grid grid-wrap">
                {Object.entries(this.props.info).map(entry => {
                    return (<div key={entry[0]} className="column-sm-6">
                        <div className="line"><label>{entry[0]}:</label></div>
                        <div className="line">{entry[1]}</div>
                    </div>);
                })}
            </div>
        );
    }
}

export default class NetworkInfoContainer extends React.Component {
    state = {
        info: {}
    };

    fetchData = () => {
        const infoService = ServiceFactory.infoService();
        return infoService.loadInfo().then(info => {
            this.setState({info});

            infoService.loadDelay(info).then(info => this.setState({info}));
        });
    };

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load blockchain info">
                <NetworkInfo info={this.state.info} />
            </Loader>
        );
    }
}
