import React from 'react';

import Firefox from '../../../images/firefox-42.svg';
import Safari from '../../../images/safari-42.svg';
import Opera from '../../../images/opera-42.svg';
import Chrome from '../../../images/chrome-42.svg';
import {UnsupportedPageView} from './UnsupportedPage.view';

const BROWSERS = [{
    icon: Chrome,
    name: 'Chrome',
    link: 'https://www.google.com/chrome/'
}, {
    icon: Firefox,
    name: 'Firefox',
    link: 'https://www.mozilla.org/firefox/new/'
}, {
    icon: Safari,
    name: 'Safari',
    link: 'https://support.apple.com/downloads/safari'
}, {
    icon: Opera,
    name: 'Opera',
    link: 'https://www.opera.com/download'
}];

export class UnsupportedPageContainer extends React.Component {
    state = {
        isOpen: true
    };

    handleClose = () => {
        this.setState({isOpen: false});
    };

    render() {
        return <UnsupportedPageView isOpen={this.state.isOpen} browsers={BROWSERS} onClose={this.handleClose} />
    }
}
