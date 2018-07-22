import React from 'react';

import NetworkInfo from './NetworkInfo';
import LastBlockList from './LastBlockList';
import UnconfirmedTxList from './UnconfirmedTxList';

export default class MainPage extends React.Component {
    render() {
        const info = {
            'Version': 'Waves v0.13.3',
            'Current height': 1040039,
            'Base Target': 57,
            'Avg Block delay': '1.01 minutes'
        };
        const blocks = [{
            height: 1040038,
            transactionCount: 0,
            time: '17:19:57',
            date: '13.06.2018'
        }, {
            height: 1040038,
            transactionCount: 0,
            time: '17:19:57',
            date: '13.06.2018'
        }, {
            height: 1040038,
            transactionCount: 0,
            time: '17:19:57',
            date: '13.06.2018'
        }, {
           height: 1040038,
           transactionCount: 0,
           time: '17:19:57',
           date: '13.06.2018'
        }];
        const unconfirmed = [{
            id: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564',
            type: 9,
            amount: '0.00000000',
            fee: '0.001',
            date: '13.06.2018',
            time: '17:19:57'
        }, {
            id: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564',
            type: 9,
            amount: '0.00000000',
            fee: '0.001',
            date: '13.06.2018',
            time: '17:19:57'
        }];
        return (
            <React.Fragment>
                <NetworkInfo info={info} />
                <div className="grid grid-wrap">
                    <LastBlockList blocks={blocks} />
                    <UnconfirmedTxList transactions={unconfirmed} />
                </div>
            </React.Fragment>
        );
    }
}
