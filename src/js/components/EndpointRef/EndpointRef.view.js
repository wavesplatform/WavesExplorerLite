import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

import Alias from '../../shared/Alias';
import {AddressRef} from './AddressRef.view';
import {AliasRef} from './AliasRef.view';

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
    appearance: PropTypes.oneOf([REGULAR, BRIGHT]),
    match: PropTypes.shape({
        params: PropTypes.shape({
            networkId: PropTypes.string
        })
    }).isRequired
};

EndpointRef.defaultProps = {
    appearance: BRIGHT
};

export const RoutedEndpointRef = withRouter(EndpointRef);
