import React from 'react';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {AssetList} from './AssetList.view';

class AssetListContainer extends React.Component {
    state = {
        assets: []
    };

    fetchData = () => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadAssets(address).then(assets => this.setState({assets}));
    };

    render() {
        return (
            <Loader fetchData={this.fetchData} errorTitle="Failed to load asset balances">
                <AssetList assets={this.state.assets} />
            </Loader>
        );
    }
}

const RoutedAssetListContainer = withRouter(AssetListContainer);

export default RoutedAssetListContainer;
