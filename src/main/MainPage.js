import React from 'react';
import axios from 'axios';

import {apiBuilder} from '../shared/NodeApi';

import NetworkInfo from './NetworkInfo';
import LastBlockList from './LastBlockList';
import UnconfirmedTxList from './UnconfirmedTxList';

const LAST_BLOCKS_COUNT = 20;

export default class MainPage extends React.Component {

    state = {
        info: {},
        unconfirmed: [],
        blocks: []
    };

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.networkId !== prevProps.match.params.networkId) {
            this.fetchData();
        }
    }

    fetchData() {
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

            const to = height.data.height;
            const from = Math.max(1, to - LAST_BLOCKS_COUNT);
            api.blocks.headers.sequence(from, to)
                .then(blocksResponse => {
                    const blocks = blocksResponse.data.map(block => block).reverse();
                    this.setState({blocks});
                });

            return api.blocks.headers.last();
        })).then(headerResponse => {
            return api.blocks.delay(headerResponse.data.signature, headerResponse.data.height - 2)
                .then(delayResponse => {
                    const delay = (parseInt(delayResponse.data.delay) / 1000 / 60.0).toFixed(1);
                    const newInfo = Object.assign({}, this.state.info, {'Avg Block delay': `${delay} minutes`}) ;
                    this.setState({info: newInfo});
                });
        });

        api.transactions.unconfirmed().then(response => {
            const unconfirmed = response.data.map(tx => tx);
            this.setState({unconfirmed});
        });
    }

    render() {
        return (
            <React.Fragment>
                <NetworkInfo info={this.state.info} />
                <div className="grid grid-wrap">
                    <LastBlockList blocks={this.state.blocks} />
                    <UnconfirmedTxList transactions={this.state.unconfirmed} />
                </div>
            </React.Fragment>
        );
    }
}
