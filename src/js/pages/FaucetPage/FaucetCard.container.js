import React from 'react';
import PropTypes from 'prop-types';

import EventBuilder from '../../shared/analytics/EventBuilder';
import ServiceFactory from '../../services/ServiceFactory';
import {RequestForm} from './RequestForm.container';
import {withRouter} from "../../withRouter";

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
        const event = new EventBuilder().faucet().events().request();
        ServiceFactory.global().analyticsService().sendEvent(event);

        const {networkId} = this.props.params;

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

                ServiceFactory.global().errorReportingService().captureException(error);
            });
    };

    validateAddress = (address) => {
        const {networkId} = this.props.params;

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
                    please contact <a href="mailto:support@waves.tech" target="_blank">support@waves.tech</a></div>
            </React.Fragment>
        );
    }
}

export const RoutedFaucetCardContainer = withRouter(FaucetCardContainer);
