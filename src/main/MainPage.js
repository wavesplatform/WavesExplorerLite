import React from 'react';

import NetworkInfo from './NetworkInfo';
import LastBlockList from './LastBlockList';
import UnconfirmedTxList from './UnconfirmedTxList';

export default class MainPage extends React.Component {
    render() {
        return (
            <React.Fragment>
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
            </React.Fragment>
        );
    }
}
