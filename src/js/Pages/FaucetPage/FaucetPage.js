import React from 'react';

import FaucetCard from './FaucetCard';
import TransactionCard from './TransactionCard';
import ServiceFactory from '../../services/ServiceFactory';

export default class FaucetPage extends React.Component {
    render() {
        const {networkId} = this.props.match.params;
        const {faucet, displayName} = ServiceFactory.global().configurationService().get(networkId);
        if (!faucet)
            return null;

        return (
            <div className="content card card-multicolumn">
                <div className="content-side__left">
                    <FaucetCard networkName={displayName} captchaKey={faucet.captchaKey} />
                </div>
                <div className="content-side__right">
                    <TransactionCard />
                </div>
            </div>
        );
    }
}
