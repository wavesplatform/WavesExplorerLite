import React from 'react';

import appLoading from './images/app-loading.gif';

const Fallback = () => {
    return (
        <img src={appLoading} height={250} width={250} alt="Loading..." style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-125px', /* Half the height */
            marginLeft: '-125px', /* Half the width */
        }}/>
    );
};

export default Fallback;

