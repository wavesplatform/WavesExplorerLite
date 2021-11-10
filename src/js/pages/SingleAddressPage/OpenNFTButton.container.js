import React from 'react';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import {OpenNFTButtonView} from './OpenNFTButton.view';

class OpenNFTButtonContainer extends React.Component {
    _isMounted = false;
    state = {
        visible: false
    };

    componentDidMount() {
        this._isMounted = true;
        this.fetchData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps) {
        const {networkId, address} = this.props.match.params;
        const {networkId: prevNetworkId, address: prevAddress} = prevProps.match.params;

        if (networkId !== prevNetworkId || address !== prevAddress) {
            this.setState({visible: false});
            this.fetchData();
        }
    }

    fetchData = () => {
        const {address, networkId} = this.props.match.params;
        const addressService = ServiceFactory.forNetwork(networkId).addressService();

        return addressService.loadNftTokens(address,10).then(response => {
            const nftSize = response.length;

            this._isMounted && this.setState({visible: nftSize > 0});
        });
    };

    handleClick = () => {
        const {address} = this.props.match.params;

        const url = `https://nft.turtlenetwork.eu/#/portfolio/${address}`;
        window.open(url, '_blank');
    };

    render() {
        if (!this.state.visible)
            return null;

        return <OpenNFTButtonView onClick={this.handleClick}>Open NFT</OpenNFTButtonView>
    }
}

export const RoutedOpenNFTButtonContainer = withRouter(OpenNFTButtonContainer);

