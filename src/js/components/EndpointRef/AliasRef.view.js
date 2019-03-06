import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Alias from '../../shared/Alias';
import {routeBuilder} from '../../shared/Routing';

export class AliasRef extends React.PureComponent {
    static propTypes = {
        networkId: PropTypes.string,
        alias: PropTypes.string.isRequired,
        title: PropTypes.string,
        className: PropTypes.string
    };

    render() {
        const {alias, className} = this.props;
        const a = Alias.fromString(alias);
        const title = this.props.title || a.alias;
        const routes = routeBuilder(this.props.networkId);

        return (<Link to={routes.aliases.one(a.alias)} className={className}>{title.substring(0, 50)}</Link>);
    }
}
