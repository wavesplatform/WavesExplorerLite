import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import '../styles/main.scss';

import Fallback from './Fallback';

const delay = (t, v) => {
    return new Promise(function(resolve) {
        setTimeout(resolve.bind(null, v), t)
    });
};

const AsyncApp = React.lazy(() => delay(250).then(() => import(/* webpackChunkName: "app" */'./App')));

const Main = () => {
    return (
        <React.Suspense fallback={<Fallback />}>
            <AsyncApp />
        </React.Suspense>
    );
};

Modal.setAppElement('#root');
ReactDOM.render(<Main />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./App', function() {
        console.log('Reloading App!');
    });
}
