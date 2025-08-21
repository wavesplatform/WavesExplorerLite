import React from 'react';
import PropTypes from 'prop-types';

import Alias from '../../shared/Alias';
import {AddressRef} from './AddressRef.view';
import {AliasRef} from './AliasRef.view';
import {RoutedAssetRef} from "../AssetRef/AssetRef.view";
import {RoutedTransactionRef} from "../TransactionRef/TransactionRef.view";
import {withRouter} from "../../withRouter";

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

const EndpointRef = ({endpoint, title, appearance, params, type}) => {
    const className = appearanceToClassName(appearance);
    const {networkId} = params;

    if (Alias.isAlias(endpoint)) {
        return <AliasRef networkId={networkId} alias={endpoint} title={title} className={className}/>;
    }

    if (type === 'asset') {
        return <RoutedAssetRef assetId={endpoint} className={className}/>;
    }

    return <AddressRef networkId={networkId} address={endpoint} title={title} className={className}/>;
};

EndpointRef.propTypes = {
    endpoint: PropTypes.string.isRequired,
    title: PropTypes.string,
    appearance: PropTypes.oneOf([REGULAR, BRIGHT]),
    params: PropTypes.shape({
        networkId: PropTypes.string
    }).isRequired
};

EndpointRef.defaultProps = {
    appearance: BRIGHT
};

export const RoutedEndpointRef = withRouter(EndpointRef);
