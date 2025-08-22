import React from 'react';

import EventBuilder from '../../shared/analytics/EventBuilder';
import ServiceFactory from '../../services/ServiceFactory';
import Loader from '../../components/Loader';

import { Pagination } from './Pagination.container';
import { BlockList } from './BlockList.view';
import {withRouter} from "../../withRouter";

const BLOCKS_PER_PAGE = 20;

const NUMBER_OF_PAGES_IN_ROW = 5;
const derivePageBoundaries = (pageNumber, lastPage) => {
    const lowPage = Math.floor((pageNumber - 1) / NUMBER_OF_PAGES_IN_ROW) * NUMBER_OF_PAGES_IN_ROW;

    return {
        lowPage: lowPage + 1,
        highPage: Math.min(lastPage, lowPage + NUMBER_OF_PAGES_IN_ROW)
    };
};

class BlocksPage extends React.Component {
    state = {
        height: 0,
        currentPage: 1,
        lastPage: 10,
        blocks: [],
        hasError: false
    };

    _isMounted = false;

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;

        const event = new EventBuilder().blocks().events().show().build();
        ServiceFactory.global().analyticsService().sendEvent(event);
    }

    initialFetch = () => {
        const {networkId} = this.props.params;
        return ServiceFactory.forNetwork(networkId).infoService().loadHeight().then(height => {
            const lastPage = Math.ceil(height / BLOCKS_PER_PAGE);

            this._isMounted && this.setState({height, lastPage}, () => {this.loadCurrentPage(1)});
        })
    };

    loadCurrentPage = (pageNumber) => {
        const {networkId} = this.props.params;
        const from = Math.max(1, this.state.height - pageNumber * BLOCKS_PER_PAGE + 1);
        const to = Math.min(this.state.height, from + BLOCKS_PER_PAGE);

        ServiceFactory
            .forNetwork(networkId)
            .blockService()
            .loadSequence(from, to)
            .then(blocks => this._isMounted && this.setState({blocks}));
    };

    handlePageChange = currentPage => {
        this.loadCurrentPage(currentPage);
        this.setState({currentPage});
        window.scrollTo(0,0)
    };

    render() {
        const {currentPage, lastPage, blocks} = this.state;
        const boundaries = derivePageBoundaries(currentPage, lastPage);
        const pagination = <Pagination boundaries={boundaries} currentPage={currentPage} lastPage={lastPage}
                                       onPageChange={this.handlePageChange}/>;
        return (
            <div className="loaderWrapper">
                <Loader fetchData={this.initialFetch} errorTitle="Failed to load blocks">
                    <div className="content card">
                        <div className="headline">
                            <span className="title large">Blocks</span>
                            {pagination}
                        </div>
                        <BlockList blocks={blocks}/>
                        <div className="headline">
                            {pagination}
                        </div>
                    </div>
                </Loader>
            </div>
        );
    }
}

export const RoutedBlocksPage = withRouter(BlocksPage);
