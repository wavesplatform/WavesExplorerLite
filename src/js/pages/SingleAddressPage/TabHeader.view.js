import React from 'react';
import PropTypes from 'prop-types';

export class TabHeader extends React.PureComponent {
    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        onActivate: PropTypes.func.isRequired
    };

    handleClick = (e) => {
        e.preventDefault();

        this.props.onActivate(this.props.index);
    };

    render() {
        let className = 'page-link bold';
        if (this.props.isActive)
            className += ' disabled';

        return (
            <span className={className}>
            {this.props.isActive ?
                this.props.title :
                <a className="no-style" href="#" onClick={this.handleClick}>{this.props.title}</a>}
            </span>
        );
    }
}
