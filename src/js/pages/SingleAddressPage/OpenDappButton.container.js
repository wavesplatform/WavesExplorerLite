import React from 'react';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import {OpenDappButtonView} from './OpenDappButton.view';

class OpenDappButtonContainer extends React.Component {
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

        return addressService.loadScriptMeta(address).then(response => {
            const meta = response.meta || {};
            const version = parseInt(meta.version);

            this._isMounted && this.setState({visible: version > 0});
        });
    };

    handleClick = () => {
        const {address} = this.props.match.params;

        const url = `https://waves-dapp.com/${address}`;
        window.open(url, '_blank');
    };

    render() {
        if (!this.state.visible)
            return null;

        return <OpenDappButtonView onClick={this.handleClick}>Open Dapp</OpenDappButtonView>
    }
}

export const RoutedOpenDappButtonContainer = withRouter(OpenDappButtonContainer);

