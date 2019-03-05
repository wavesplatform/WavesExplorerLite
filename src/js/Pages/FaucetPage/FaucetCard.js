import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import RequestForm from './RequestForm';

class FaucetCardContainer extends React.Component {
    static propTypes = {
        networkName: PropTypes.string.isRequired,
        captchaKey: PropTypes.string.isRequired
    };

    state = {
        tx: [],
        status: null
    };

    requestMoney = (values) => {
        const {networkId} = this.props.match.params;

        return ServiceFactory
            .forNetwork(networkId)
            .faucetService()
            .requestMoney(values.address, values.captchaToken)
            .then(() => {
                this.setState({status: {
                    successful: true
                }});
            })
            .catch(error => {
                let message = error.message;
                if (error.response && error.response.data && error.response.data.message) {
                    message = error.response.data.message;
                }
                this.setState({status: {
                    successful: false,
                    message
                }});
            });
    };

    validateAddress = (address) => {
        const {networkId} = this.props.match.params;

        return ServiceFactory
            .forNetwork(networkId)
            .addressService()
            .validate(address);
    };

    render() {
        return (
            <React.Fragment>
                <div className="card faucet">
                    <div className="faucet-image"></div>
                    <RequestForm
                        networkName={this.props.networkName}
                        onSubmit={this.requestMoney}
                        captchaKey={this.props.captchaKey}
                        validateAddress={this.validateAddress}
                        status={this.state.status}
                    />
                </div>
                <div className="basic500 faucet-description fs12">If you experience any problems with the faucet,
                    please contact <a href="mailto:support@wavesplatform.com" target="_blank">support@wavesplatform.com</a></div>
            </React.Fragment>
        );
    }
}

export default withRouter(FaucetCardContainer);
