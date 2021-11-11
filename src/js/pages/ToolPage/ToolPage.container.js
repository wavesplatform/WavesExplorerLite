import React from 'react';

import EventBuilder from '../../shared/analytics/EventBuilder';
import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import Headline from '../../components/Headline';
import {ToolList} from './ToolList.view';

export class ToolPage extends React.Component {
    state = {
        tools: []
    };

    componentDidMount() {
        const event = new EventBuilder().tools().events().show().build();
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
            .toolsService()
            .loadTools()
            .then(tools => this.setState({tools}));
    };

    render() {
        const {networkId} = this.props.match.params;
        const configuration = ServiceFactory.global().configurationService().get(networkId);

        return (
            <div className="loaderWrapper">
                <Loader fetchData={this.fetchData} errorTitle="Failed to load tool details">
                    <div className="content card">
                        <Headline title={`${configuration.displayName} Tools`} copyVisible={false}/>
                        <ToolList tools={this.state.tools} />
                    </div>
                </Loader>
            </div>
        );
    }
}
