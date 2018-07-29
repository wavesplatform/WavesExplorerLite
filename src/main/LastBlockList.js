import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import LastBlockListItem from './LastBlockListItem';

export default class LastBlockList extends React.PureComponent {
    static propTypes = {
        baseUrl: PropTypes.string.isRequired,
        blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
        title: PropTypes.string
    };

    static defaultProps = {
        title: 'Last blocks'
    };

    render() {
        return (
            <div className="column-6 column-sm-12 panel">
                <div className="headline">
                    <span className="title">{this.props.title}</span>
                    <span className="grid-item-fixed">
                        <Link className="no-accent" to={`${this.props.baseUrl}/blocks`}>View all blocks</Link>
                    </span>
                </div>
                {this.props.blocks.map((block, index) => {
                    return (<LastBlockListItem key={index} baseUrl={this.props.baseUrl} block={block} />);
                })}
            </div>
        );
    }
}
