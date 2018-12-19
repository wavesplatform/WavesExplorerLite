import React from 'react';

import appLoading from './images/app-loading.gif';

const Fallback = () => {
    return (
        <img src={appLoading} height={50} width={50} alt="Loading..." style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-25px', /* Half the height */
            marginLeft: '-25px', /* Half the width */
        }}/>
    );
};

export default Fallback;

