import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './styles/main.scss';

import Search from './search';
import NavBar from './nav-bar';
import MainPage from './main-page';

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="header grid">
                    <div className="header-title grid-item-fixed grid">
                        <div className="menu-toggle grid-item-fixed lg-show xlg-hide"></div>
                        <div className="logo"></div>
                    </div>
                    <Search />
                </div>
                <div className="container grid">
                     <NavBar />
                     <div className="content card">
                        <MainPage />
                     </div>
                 </div>
            </React.Fragment>
        );
    }
}

export default hot(module)(App);
