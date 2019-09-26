import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../components/Loader';

const Button = ({caption, clickHandler}) => (
    <div className="btn btn-toggle" onClick={clickHandler}>{caption}</div>
);

Button.propTypes = {
    caption: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired
};

export const RawTransactionView = ({open, clickHandler, json, fetchData}) => {
    const caption = open ? 'Hide' : 'Show';

    return (
        <div>
            {open && (
                <Loader fetchData={fetchData} errorTitle="Failed to load transaction JSON">
                    <div className="data-container margin6">
                        <pre>{JSON.stringify(json, null, 2)}</pre>
                    </div>
                </Loader>
            )}
            <Button caption={caption} clickHandler={clickHandler} />
        </div>
    );
};

RawTransactionView.propTypes = {
    open: PropTypes.bool.isRequired,
    clickHandler: PropTypes.func.isRequired,
    json: PropTypes.object,
    fetchData: PropTypes.func.isRequired
};
