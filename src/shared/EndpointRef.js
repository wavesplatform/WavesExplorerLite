import React from 'react';
import PropTypes from 'prop-types';

import Alias from './Alias';
import AliasRef from './AliasRef';
import AddressRef from './AddressRef';

const REGULAR = 'regular';
const BRIGHT = 'bright';

const EndpointRef = ({endpoint, title, appearance}) => {
    if (Alias.isAlias(endpoint)) {
        return <AliasRef alias={endpoint} title={title} appearance={appearance} />;
    }

    return <AddressRef address={endpoint} title={title} appearance={appearance} />;
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
