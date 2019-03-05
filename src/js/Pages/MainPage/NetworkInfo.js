import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';

import Loader from '../../Components/Loader';

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

class NetworkInfoContainer extends React.Component {
    state = {
        info: {}
    };

    componentWillUnmount() {
        this.removeRefreshInterval();
    }

    initialFetch = () => {
        return this.fetchData().then(this.setRefreshInterval);
    };

    fetchData = () => {
        const {networkId} = this.props.match.params;
        const infoService = ServiceFactory.forNetwork(networkId).infoService();
        return infoService.loadInfo().then(info => {
            const change = Object.assign({}, this.state.info, info);
            this.setState({info: change});

            infoService.loadDelay(info).then(info => this.setState({info}));
        });
    };

    setRefreshInterval = () => {
        this.interval = setInterval(() => this.fetchData(), 5000);
    };

    removeRefreshInterval = () => {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    render() {
        return (
            <Loader fetchData={this.initialFetch} errorTitle="Failed to load blockchain info">
                <NetworkInfo info={this.state.info} />
            </Loader>
        );
    }
}

export default withRouter(NetworkInfoContainer);
