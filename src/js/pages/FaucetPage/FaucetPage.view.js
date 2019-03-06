import React from 'react';

import {RoutedFaucetCardContainer} from './FaucetCard.container';
import {RoutedTransactionCardContainer} from './TransactionCard.container';
import ServiceFactory from '../../services/ServiceFactory';

export class FaucetPage extends React.Component {
    render() {
        const {networkId} = this.props.match.params;
        const {faucet, displayName} = ServiceFactory.global().configurationService().get(networkId);
        if (!faucet)
            return null;

        return (
            <div className="content card card-multicolumn">
                <div className="content-side__left">
                    <RoutedFaucetCardContainer networkName={displayName} captchaKey={faucet.captchaKey} />
                </div>
                <div className="content-side__right">
                    <RoutedTransactionCardContainer />
                </div>
            </div>
        );
    }
}
