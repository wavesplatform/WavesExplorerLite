import React from 'react';
import {Redirect} from 'react-router-dom';

import {routes} from '../shared/Routing';
import ServiceFactory from '../services/ServiceFactory';

import Loader from '../shared/Loader';

export default class SingleAliasPage extends React.Component {
    state = {
        address: null
    };

    fetchData = () => {
        return ServiceFactory.aliasService()
            .loadAddress(this.props.match.params.alias)
            .then(address => this.setState({address}))
    };

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to resolve alias">
                {this.state.address && <Redirect to={routes.addresses.one(this.state.address)}/>}
            </Loader>
        );
    }
}
