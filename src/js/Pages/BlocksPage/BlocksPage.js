import React from 'react';

import EventBuilder from '../../shared/analytics/EventBuilder';
import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../Components/Loader';

import Pagination from './Pagination';
import BlockList from './BlockList';

const BLOCKS_PER_PAGE = 20;

export default class BlocksPage extends React.Component {
    state = {
        height: 0,
        currentPage: 1,
        lastPage: 10,
        blocks: [],
        hasError: false
    };

    componentDidMount() {
        const event = new EventBuilder().blocks().events().show().build();
        ServiceFactory.global().analyticsService().sendEvent(event);
    }

    initialFetch = () => {
        const {networkId} = this.props.match.params;
        return ServiceFactory.forNetwork(networkId).infoService().loadHeight().then(height => {
            const lastPage = Math.ceil(height / BLOCKS_PER_PAGE);

            this.setState({height, lastPage});

            return this.loadCurrentPage(1);
        })
    };

    loadCurrentPage = (pageNumber) => {
        const {networkId} = this.props.match.params;
        const from = Math.max(1, this.state.height - pageNumber * BLOCKS_PER_PAGE + 1);
        const to = Math.min(this.state.height, from + BLOCKS_PER_PAGE);

        ServiceFactory
            .forNetwork(networkId)
            .blockService()
            .loadSequence(from, to)
            .then(blocks => this.setState({blocks}));
    };

    handlePageChange = pageNumber => {
        this.loadCurrentPage(pageNumber);
    };

    render() {
        return (
            <div className="loaderWrapper">
                <Loader fetchData={this.initialFetch} errorTitle="Failed to load blocks">
                    <div className="content card">
                        <div className="headline">
                            <span className="title">Blocks</span>
                            <Pagination currentPage={this.state.currentPage} lastPage={this.state.lastPage}
                                        onPageChange={this.handlePageChange} />
                        </div>
                        <BlockList blocks={this.state.blocks} />
                    </div>
                </Loader>
            </div>
        );
    }
}
