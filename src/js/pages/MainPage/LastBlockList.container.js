import React from 'react';

import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';
import {LastBlockList} from './LastBlockList.view';
import {withRouter} from "../../withRouter";

const LAST_BLOCKS_COUNT = 20;

class LastBlockListContainer extends React.Component {
    state = {
        blocks: [],
        finalizedHeight: 1
    };

    componentWillUnmount() {
        this.removeRefreshInterval();
    }

    initialFetch = () => {
        return this.fetchData().then(this.setRefreshInterval);
    };

    fetchData = () => {
        const {networkId} = this.props.params;
        const factory = ServiceFactory.forNetwork(networkId);
        return Promise.all([
            factory.infoService().loadHeight(),
            factory.finalityService().loadHeaderInfo()
        ]).then(([height, headerInfo]) => {
                const to = height;
                const from = Math.max(1, to - LAST_BLOCKS_COUNT);
                return factory.blockService().loadSequence(from, to).then(blocks => ({blocks, headerInfo}));
            }).then(({blocks, headerInfo}) => this.setState({
                blocks,
                finalizedHeight: headerInfo && Number.isFinite(headerInfo.lastFinalizedHeight)
                    ? headerInfo.lastFinalizedHeight
                    : Math.max(height - 100, 1)
            }));
    };

    setRefreshInterval = () => {
        this.interval = setInterval(() => this.fetchData(), 5000);
    };

    removeRefreshInterval = () => {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };

    render() {
        const {networkId} = this.props.params;
        return (
            <Loader fetchData={this.initialFetch} errorTitle="Failed to load last blocks">
                <LastBlockList
                    blocks={this.state.blocks}
                    networkId={networkId}
                    finalizedHeight={this.state.finalizedHeight}
                />
            </Loader>
        );
    }
}

export const RoutedLastBlockListContainer = withRouter(LastBlockListContainer);
