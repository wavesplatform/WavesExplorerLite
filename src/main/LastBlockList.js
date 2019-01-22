import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {routes} from '../shared/Routing';
import LastBlockListItem from './LastBlockListItem';
import Loader from '../shared/Loader';

import ServiceFactory from '../services/ServiceFactory';

const LAST_BLOCKS_COUNT = 20;

export class LastBlockList extends React.PureComponent {
    static propTypes = {
        blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
        title: PropTypes.string
    };

    static defaultProps = {
        title: 'Last blocks'
    };

    render() {
        return (
            <div className="panel">
                <div className="grid grid-baseline panel-title">
                    <span className="title">{this.props.title}</span>
                    <span className="grid-item-fixed">
                        <Link className="no-accent" to={routes.blocks.list}>View all blocks</Link>
                    </span>
                </div>
                {this.props.blocks.map((block) => {
                    return (<LastBlockListItem key={block.height} block={block} />);
                })}
            </div>
        );
    }
}

export default class LastBlockListContainer extends React.Component {
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
        return ServiceFactory.infoService().loadHeight()
            .then(height => {
                const to = height;
                const from = Math.max(1, to - LAST_BLOCKS_COUNT);
                return ServiceFactory.blockService().loadSequence(from, to)
            }).then(blocks => this.setState({blocks}));
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
        return (
            <Loader fetchData={this.initialFetch} errorTitle="Failed to load last blocks">
                <LastBlockList blocks={this.state.blocks} />
            </Loader>
        );
    }
}
