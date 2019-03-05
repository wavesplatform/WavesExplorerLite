import React from 'react';
import {Redirect} from 'react-router-dom';

import {routeBuilder} from '../../shared/Routing';
import ServiceFactory from '../../services/ServiceFactory';

import Loader from '../../Components/Loader';

export default class SingleAliasPage extends React.Component {
    state = {
        address: null
    };

    fetchData = () => {
        const {networkId} = this.props.match.params;
        return ServiceFactory.forNetwork(networkId).aliasService()
            .loadAddress(this.props.match.params.alias)
            .then(address => this.setState({address}))
    };

    render() {
        const {networkId} = this.props.match.params;
        const routes = routeBuilder(networkId);
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to resolve alias">
                {this.state.address && <Redirect to={routes.addresses.one(this.state.address)}/>}
            </Loader>
        );
    }
}
