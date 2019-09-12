import React from 'react';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {GroupedAliasList} from './GroupedAliasList.view';

class GroupedAliasListContainer extends React.Component {
    state = {
        aliases: []
    };

    fetchData = () => {
        const {address, networkId} = this.props.match.params;
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
