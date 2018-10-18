import React from 'react';
import axios from 'axios';

import {apiBuilder} from '../shared/NodeApi';

import NetworkInfo from './NetworkInfo';
import LastBlockList from './LastBlockList';
import UnconfirmedTxList from './UnconfirmedTxList';

export default class MainPage extends React.Component {

    state = {
        info: {}
    };

    componentDidMount() {
        const {networkId} = this.props.match.params;
        const api = apiBuilder(networkId);

        axios.all([
            api.version(),
            api.blocks.height(),
            api.baseTarget()
        ]).then(axios.spread((version, height, baseTarget) => {
            const info = {
                'Version': version.data.version,
                'Current height': height.data.height,
                'Base Target': baseTarget.data.baseTarget
            };
            this.setState({info});

            return api.blocks.headers.last();
        })).then(headerResponse => {
            return api.blocks.delay(headerResponse.data.signature, headerResponse.data.height - 2)
                .then(delayResponse => {
                    const delay = (parseInt(delayResponse.data.delay) / 1000 / 60.0).toFixed(1);
                    const newInfo = Object.assign({}, this.state.info, {'Avg Block delay': `${delay} minutes`}) ;
                    this.setState({info: newInfo});
                });
        });
    }

    render() {
        const blocks = [{
            height: 1040038,
            transactionCount: 0,
            time: '17:19:57',
            date: '13.06.2018',
            signature: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564'
        }, {
            height: 1040038,
            transactionCount: 0,
            time: '17:19:57',
            date: '13.06.2018',
            signature: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564'
        }, {
            height: 1040038,
            transactionCount: 0,
            time: '17:19:57',
            date: '13.06.2018',
            signature: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564'
        }, {
           height: 1040038,
           transactionCount: 0,
           time: '17:19:57',
           date: '13.06.2018',
           signature: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564'
        }];
        const unconfirmed = [{
            id: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564',
            type: 9,
            amount: '0.00000000',
            fee: '0.001',
            date: '13.06.2018',
            time: '17:19:57',
            sender: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564',
            recipient: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564'
        }, {
            id: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564',
            type: 9,
            amount: '0.00000000',
            fee: '0.001',
            date: '13.06.2018',
            time: '17:19:57',
            sender: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564',
            recipient: '3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564'
        }];
        return (
            <React.Fragment>
                <NetworkInfo info={this.state.info} />
                <div className="grid grid-wrap">
                    <LastBlockList baseUrl={this.props.match.url} blocks={blocks} />
                    <UnconfirmedTxList baseUrl={this.props.match.url} transactions={unconfirmed} />
                </div>
            </React.Fragment>
        );
    }
}
