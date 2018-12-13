import React from 'react';
import configuration from 'configuration';

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
        return ServiceFactory.nodesService().loadNodes()
            .then(nodes => this.setState({nodes}));
    };

    render() {
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
