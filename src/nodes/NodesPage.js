import React from 'react';

import ServiceFactory from '../services/ServiceFactory';
import Loader from '../shared/Loader';
import Headline from '../shared/Headline';
import NodeList from './NodeList';

export default class NodesPage extends React.Component {
    state = {
        nodes: []
    };

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.fetchData();
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const {networkId} = this.props.match.params;

        return ServiceFactory
            .forNetwork(networkId)
            .nodesService()
            .loadNodes()
            .then(nodes => this.setState({nodes}));
    };

    render() {
        const {networkId} = this.props.match.params;
        const configuration = ServiceFactory.global().configurationService().get(networkId);

        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load node details">
                <div className="content card">
                    <Headline title={`${configuration.displayName} Nodes`} copyVisible={false}/>
                    <NodeList nodes={this.state.nodes} />
                </div>
            </Loader>
        );
    }
}
