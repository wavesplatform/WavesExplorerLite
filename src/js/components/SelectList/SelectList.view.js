import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({item, onSelect}) => (
    <div onClick={() => onSelect(item)}>{item.value}</div>
);

export const itemShape = PropTypes.shape({
    option: PropTypes.string,
    value: PropTypes.string
});

export class SelectListView extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(itemShape).isRequired,
        selectedItem: itemShape.isRequired,
        expanded: PropTypes.bool.isRequired,
        onToggle: PropTypes.func.isRequired,
        onSelectedItemChanged: PropTypes.func
    };

    static defaultProps = {
        onSelectedItemChanged: () => {}
    };

    render() {
        const {items, selectedItem, expanded, onSelectedItemChanged} = this.props;
        const listClassName = 'select-list' + (expanded ? ' expanded' : '');

        return (
            <div className="select-list-container">
                <span className={listClassName} onClick={this.props.onToggle}>{selectedItem.value}</span>
                <div className="select-list-expanded">
                    {items
                        .filter(item => item.option !== selectedItem.option)
                        .map((item, index) => {
                            return <ListItem key={index} item={item} onSelect={onSelectedItemChanged} />
                        })
                    }
                </div>
            </div>
        );
    }
}
