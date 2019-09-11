import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export class TabHeader extends React.PureComponent {
    static propTypes = {
        isActive: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        basePath: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    };

    render() {
        const {basePath, isActive, title, id} = this.props;

        let className = 'page-link bold';
        if (isActive)
            className += ' disabled';

        return (
            <span className={className}>
            {isActive ?
                title :
                <Link to={`${basePath}/${id}`} className="no-style">{title}</Link>}
            </span>
        );
    }
}
