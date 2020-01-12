import React from 'react';

import EventBuilder from '../../shared/analytics/EventBuilder';
import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import Headline from '../../components/Headline';
import {GatewayList} from './GatewayList.view';

export class GatewayPage extends React.Component {
    state = {
        gateways: []
    };

    componentDidMount() {
        const event = new EventBuilder().gateways().events().show().build();
        ServiceFactory.global().analyticsService().sendEvent(event);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.fetchData();
        }
    }

    fetchData = () => {
        const {networkId} = this.props.match.params;

        return ServiceFactory
            .forNetwork(networkId)
            .gatewaysService()
            .loadGateways()
            .then(gateways => this.setState({gateways}));
    };

    render() {
        const {networkId} = this.props.match.params;
        const configuration = ServiceFactory.global().configurationService().get(networkId);

        return (
            <div className="loaderWrapper">
                <Loader fetchData={this.fetchData} errorTitle="Failed to load gateway details">
                    <div className="content card">
                        <Headline title={`${configuration.displayName} Gateways`} copyVisible={false}/>
                        <GatewayList gateways={this.state.gateways} />
                    </div>
                </Loader>
            </div>
        );
    }
}
