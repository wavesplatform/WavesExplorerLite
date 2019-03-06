import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {routeBuilder} from '../../shared/Routing';
import {LastBlockListItem} from './LastBlockListItem.view';

export class LastBlockList extends React.PureComponent {
    static propTypes = {
        networkId: PropTypes.string,
        blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
        title: PropTypes.string
    };

    static defaultProps = {
        title: 'Last blocks'
    };

    render() {
        const routes = routeBuilder(this.props.networkId);

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
