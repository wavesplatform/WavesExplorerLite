import React from 'react';
import PropTypes from 'prop-types';

import {itemShape, SelectListView} from './SelectList.view';

export class SelectListContainer extends React.Component {
    static propTypes = {
        items: PropTypes.arrayOf(itemShape).isRequired,
        selectedItem: itemShape.isRequired,
        onSelectedItemChanged: PropTypes.func
    };

    static defaultProps = {
        onSelectedItemChanged: () => {}
    };

    state = {
        selectedItem: this.props.selectedItem,
        expanded: false
    };

    toggleList = () => {
        this.setState({expanded: !this.state.expanded});
    };

    handleSelectedItemChanged = (selectedItem) => {
        this.setState({
            selectedItem,
            expanded: false
        });

        this.props.onSelectedItemChanged(selectedItem);
    };

    render() {
        return (
            <SelectListView
                items={this.props.items}
                selectedItem={this.state.selectedItem}
                expanded={this.state.expanded}
                onToggle={this.toggleList}
                onSelectedItemChanged={this.handleSelectedItemChanged}
            />
        );
    }
}
