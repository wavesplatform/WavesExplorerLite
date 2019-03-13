import React from 'react';
import ReactDOM from 'react-dom';

jest.mock('react-ga');
jest.mock('amplitude-js');

import App from './App';

describe('App', () => {
    xit('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});


