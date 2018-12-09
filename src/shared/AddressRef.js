import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {routes} from './Routing';

const REGULAR = 'regular';
const BRIGHT = 'bright';

class AddressRef extends React.PureComponent {
    static propTypes = {
        address: PropTypes.string.isRequired,
        title: PropTypes.string,
        appearance: PropTypes.oneOf([REGULAR, BRIGHT])
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
        const {address, appearance} = this.props;
        const title = this.props.title || address;
        const className = this.appearanceToClassName(appearance);

        return (<Link to={routes.addresses.one(address)} className={className}>{title}</Link>);
    }
}

export default AddressRef;
