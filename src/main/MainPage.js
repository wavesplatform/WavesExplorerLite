import React from 'react';

import NetworkInfo from './NetworkInfo';
import LastBlockList from './LastBlockList';
import UnconfirmedTxList from './UnconfirmedTxList';

import EventBuilder from '../shared/analytics/EventBuilder';
import ServiceFactory from '../services/ServiceFactory';

export default class MainPage extends React.Component {
    componentDidCatch(error, errorInfo) {
        ServiceFactory
            .global()
            .errorReportingService()
            .captureComponentError(error, errorInfo);
    }

    componentDidMount() {
        const event = new EventBuilder().main().events().show().build();
        ServiceFactory.global().analyticsService().sendEvent(event);
    }

    render() {
        return (
            <div className="content card">
                <div className="info-box">
                    <NetworkInfo />
                </div>
                <div className="grid grid-wrap">
                    <div className="column-6 column-sm-12">
                        <LastBlockList />
                    </div>
                    <div className="column-6 column-sm-12">
                        <UnconfirmedTxList />
                    </div>
                </div>
            </div>
        );
    }
}
