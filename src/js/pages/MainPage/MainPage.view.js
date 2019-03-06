import React from 'react';

import {RoutedNetworkInfoContainer} from './NetworkInfo.container';
import {RoutedLastBlockListContainer} from './LastBlockList.container';
import {RoutedUnconfirmedTxListContainer} from './UnconfirmedTxList.container';

import EventBuilder from '../../shared/analytics/EventBuilder';
import ServiceFactory from '../../services/ServiceFactory';

export class MainPage extends React.Component {
    componentDidMount() {
        const event = new EventBuilder().main().events().show().build();
        ServiceFactory.global().analyticsService().sendEvent(event);
    }

    render() {
        return (
            <div className="content card">
                <div className="info-box">
                    <RoutedNetworkInfoContainer />
                </div>
                <div className="grid grid-wrap">
                    <div className="column-6 column-sm-12">
                        <RoutedLastBlockListContainer />
                    </div>
                    <div className="column-6 column-sm-12">
                        <RoutedUnconfirmedTxListContainer />
                    </div>
                </div>
            </div>
        );
    }
}
