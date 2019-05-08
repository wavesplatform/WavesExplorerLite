import React from 'react';
import PropTypes from 'prop-types';
import {StateChangesInfoView} from './StateChangesInfo.view';

export const StateChangesInfoContainer = ({changes}) => {
    const json = JSON.stringify(changes, null, 2);

    return <StateChangesInfoView changes={json} />;
};

StateChangesInfoContainer.propTypes = {
    changes: PropTypes.shape({
        data: PropTypes.array,
        transfers: PropTypes.array
    }).isRequired
};
