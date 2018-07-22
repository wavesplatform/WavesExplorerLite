import React from 'react';
import PropTypes from 'prop-types';

import BlockListItem from './LastBlockListItem';

export default class BlockList extends React.PureComponent {
    static propTypes = {
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
                </div>
                {this.props.blocks.map((block, index) => {
                    return (<BlockListItem key={index} block={block} />);
                })}
            </div>
        );
    }
}
