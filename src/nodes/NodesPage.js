import React from 'react';

import ServiceFactory from '../services/ServiceFactory';
import Loader from '../shared/Loader';
import NodeList from './NodeList';

export default class NodesPage extends React.Component {
    state = {
        nodes: []
    };

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
                <React.Fragment>
                    <div className="headline">
                        <span className="title">{configuration.displayName} Nodes</span>
                    </div>
                    <NodeList nodes={this.state.nodes} />
                </React.Fragment>
            </Loader>
        );
    }
}
