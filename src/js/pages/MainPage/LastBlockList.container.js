import React from 'react';
import {withRouter} from 'react-router';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {LastBlockList} from './LastBlockList.view';

const LAST_BLOCKS_COUNT = 20;

class LastBlockListContainer extends React.Component {
    state = {
        blocks: []
    };

    componentWillUnmount() {
        this.removeRefreshInterval();
    }

    initialFetch = () => {
        return this.fetchData().then(this.setRefreshInterval);
    };

    fetchData = () => {
        const {networkId} = this.props.match.params;
        const factory = ServiceFactory.forNetwork(networkId);
        return factory.infoService().loadHeight()
            .then(height => {
                const to = height;
                const from = Math.max(1, to - LAST_BLOCKS_COUNT);
                return factory.blockService().loadSequence(from, to)
            }).then(blocks => this.setState({blocks}));
    };

    setRefreshInterval = () => {
        this.interval = setInterval(() => this.fetchData(), 10000);
    };

    removeRefreshInterval = () => {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    render() {
        const {networkId} = this.props.match.params;
        return (
            <Loader fetchData={this.initialFetch} errorTitle="Failed to load last blocks">
                <LastBlockList blocks={this.state.blocks} networkId={networkId} />
            </Loader>
        );
    }
}

export const RoutedLastBlockListContainer = withRouter(LastBlockListContainer);
