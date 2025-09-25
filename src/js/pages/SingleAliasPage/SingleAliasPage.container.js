import React from 'react';
import {Navigate} from 'react-router-dom';

import {routeBuilder} from '../../shared/Routing';
import ServiceFactory from '../../services/ServiceFactory';

import Loader from '../../components/Loader';
import {withRouter} from "../../withRouter";

class SingleAliasPage extends React.Component {
    state = {
        address: null
    };

    fetchData = () => {
        const {networkId} = this.props.params;
        return ServiceFactory.forNetwork(networkId).aliasService()
            .loadAddress(this.props.params.alias)
            .then(address => this.setState({address}))
    };

    render() {
        const {networkId} = this.props.params;
        const routes = routeBuilder(networkId);
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to resolve alias">
                {this.state.address && <Navigate to={routes.addresses.one(this.state.address)}/>}
            </Loader>
        );
    }
}

export const RoutedSingleAliasPage = withRouter(SingleAliasPage);
