import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Alias from './Alias';
import {routes} from './Routing';

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
        address: PropTypes.string.isRequired,
        title: PropTypes.string,
        className: PropTypes.string
    };

    render() {
        const {address, className} = this.props;
        const title = this.props.title || address;

        return (<Link to={routes.addresses.one(address)} className={className}>{title}</Link>);
    }
}

class AliasRef extends React.PureComponent {
    static propTypes = {
        alias: PropTypes.string.isRequired,
        title: PropTypes.string,
        className: PropTypes.string
    };

    render() {
        const {alias, className} = this.props;
        const a = Alias.fromString(alias);
        const title = this.props.title || a.alias;

        return (<Link to={routes.aliases.one(a.alias)} className={className}>{title.substring(0, 50)}</Link>);
    }
}

const EndpointRef = ({endpoint, title, appearance}) => {
    const className = appearanceToClassName(appearance);

    if (Alias.isAlias(endpoint)) {
        return <AliasRef alias={endpoint} title={title} className={className} />;
    }

    return <AddressRef address={endpoint} title={title} className={className} />;
};

EndpointRef.propTypes = {
    endpoint: PropTypes.string.isRequired,
    title: PropTypes.string,
    appearance: PropTypes.oneOf([REGULAR, BRIGHT])
};

EndpointRef.defaultProps = {
    appearance: BRIGHT
};

export default EndpointRef;
