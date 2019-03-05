import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import Alias from './Alias';
import {routeBuilder} from './Routing';

const REGULAR = 'regular';
const BRIGHT = 'bright';

const appearanceToClassName = appearance => {
    switch (appearance) {
        case REGULAR:
            return 'no-accent';

        default:
            return '';
    }
};

class AddressRef extends React.PureComponent {
    static propTypes = {
        networkId: PropTypes.string,
        address: PropTypes.string.isRequired,
        title: PropTypes.string,
        className: PropTypes.string
    };

    render() {
        const {address, className} = this.props;
        const title = this.props.title || address;
        const routes = routeBuilder(this.props.networkId);

        return (<Link to={routes.addresses.one(address)} className={className}>{title}</Link>);
    }
}

class AliasRef extends React.PureComponent {
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

const EndpointRef = ({endpoint, title, appearance, match}) => {
    const className = appearanceToClassName(appearance);
    const {networkId} = match.params;

    if (Alias.isAlias(endpoint)) {
        return <AliasRef networkId={networkId} alias={endpoint} title={title} className={className} />;
    }

    return <AddressRef networkId={networkId} address={endpoint} title={title} className={className} />;
};

EndpointRef.propTypes = {
    endpoint: PropTypes.string.isRequired,
    title: PropTypes.string,
    appearance: PropTypes.oneOf([REGULAR, BRIGHT])
};

EndpointRef.defaultProps = {
    appearance: BRIGHT
};

export default withRouter(EndpointRef);
