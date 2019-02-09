import React from 'react';

import appLoading from './images/app-loading.gif';

const Fallback = () => {
    return (
        <img src={appLoading} height={48} width={48} alt="Loading..." style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-24px', /* Half the height */
            marginLeft: '-24px', /* Half the width */
            boxShadow: '0 0 0 10000px white'
        }}/>
    );
};

export default Fallback;
