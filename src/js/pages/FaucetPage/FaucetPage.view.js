import React from 'react';
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';

import {RoutedFaucetCardContainer} from './FaucetCard.container';
import {RoutedTransactionCardContainer} from './TransactionCard.container';
import ServiceFactory from '../../services/ServiceFactory';
import {withRouter} from "../../withRouter";

class FaucetPage extends React.Component {
    render() {
        const {networkId} = this.props.params;
        const {faucet, displayName} = ServiceFactory.global().configurationService().get(networkId);
        if (!faucet)
            return null;

        return (
            <GoogleReCaptchaProvider reCaptchaKey={faucet.captchaKey}>
                <div className="content card card-multicolumn">
                    <div className="content-side__left">
                        <RoutedFaucetCardContainer networkName={displayName} />
                    </div>
                    <div className="content-side__right">
                        <RoutedTransactionCardContainer />
                    </div>
                </div>
            </GoogleReCaptchaProvider>
        );
    }
}

export const RoutedFaucetPage = withRouter(FaucetPage);
