import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

import {routeBuilder} from './Routing';

const REGULAR = 'regular';
const BRIGHT = 'bright';

class AddressRef extends React.PureComponent {
    static propTypes = {
        address: PropTypes.string.isRequired,
        title: PropTypes.string,
        appearance: PropTypes.string
    };

    static defaultProps = {
        appearance: BRIGHT
    };

    appearanceToClassName = appearance => {
        switch (appearance) {
            case REGULAR:
                return 'no-accent';

            default:
                return '';
        }
    };

    render() {
        const {networkId} = this.props.match.params;
        const routes = routeBuilder(networkId);
        const {address, appearance} = this.props;
        const title = this.props.title || address;
        const className = this.appearanceToClassName(appearance);

        return (<Link to={routes.addresses.one(address)} className={className}>{title}</Link>);
    }
}

export default withRouter(AddressRef);
