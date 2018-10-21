import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import {routeBuilder} from '../shared/Routing';
import LastBlockListItem from './LastBlockListItem';

class LastBlockList extends React.PureComponent {
    static propTypes = {
        blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
        title: PropTypes.string
    };

    static defaultProps = {
        title: 'Last blocks'
    };

    render() {
        const {networkId} = this.props.match.params;
        const routes = routeBuilder(networkId);

        return (
            <div className="column-6 column-sm-12 panel">
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

export default withRouter(LastBlockList);
