import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {AssetList} from './AssetList.view';
import transactionMapper from "./TransactionMapper";
import {withRouter} from "../../withRouter";

class AssetListContainer extends React.Component {
    state = {
        assets: [],
        loading: false,
        hasMore: true
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    fetchData = () => {
        const {address, networkId} = this.props.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadAssets(address).then(assets => this._isMounted && this.setState({assets}));
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
