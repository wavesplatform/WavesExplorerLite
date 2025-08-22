import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {GroupedAliasList} from './GroupedAliasList.view';
import {withRouter} from "../../withRouter";

class GroupedAliasListContainer extends React.Component {
    state = {
        aliases: []
    };

    fetchData = () => {
        const {address, networkId} = this.props.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadAliases(address).then(aliases => this.setState({aliases}));
    };

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load aliases">
                <GroupedAliasList aliases={this.state.aliases} />
            </Loader>
        );
    }
}

const RoutedGroupedAliasListContainer = withRouter(GroupedAliasListContainer);

export default RoutedGroupedAliasListContainer;
