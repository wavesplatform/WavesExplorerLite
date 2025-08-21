import React from 'react';

import ServiceFactory from './services/ServiceFactory';
import {withRouter} from "./withRouter";

const FADE_TIMEOUT = 2000;

class Search extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isFocused: false,
            isFailed: false,
            searchText: ''
        };
        this.inputRef = React.createRef();
    }

    go = (route) => {
        this.props.history.push(route);
    };

    handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            this.setState({
                isFailed: false,
                isLoading: true
            });

            const {networkId} = this.props.params;

            const searchService = ServiceFactory.forNetwork(networkId).searchService();

            return searchService.search(this.state.searchText).then(route => {
                this.setState({
                    searchText: '',
                    isLoading: false
                });

                this.go(route);
            }).catch(err => {
                console.error(err);

                this.setState({
                    isLoading: false,
                    isFailed: true
                });

                setTimeout(() => this.setState({isFailed: false}), FADE_TIMEOUT);
            });
        }
    };

    handleChange = (e) => {
        this.setState({
            searchText: e.target.value,
            isFailed: false
        });
    };

    handleFocus = (e) => {
        this.setState({isFocused: true});
    };

    handleBlur = (e) => {
        this.setState({isFocused: false});
    };

    handleClearClick = () => {
        this.setState({searchText: ''});

        this.inputRef.current.focus();
    };

    render() {
        const textIsNotEmpty = !!this.state.searchText;

        let className = 'search-box grid grid-center';
        if (this.state.isFailed) {
            className += ' search-box-invalid';
        }

        if (this.state.isFocused) {
            className += ' search-box-focus';
        } else if (textIsNotEmpty) {
            className += ' search-box-active';
        }

        if (this.state.isLoading) {
            className += ' search-box-loading';
        }

        return (
            <div className={className}>
                <div className="search grid-item-fixed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </div>
                <input
                    className="search-input"
                    ref={this.inputRef}
                    placeholder="Search address, transaction id, block id, alias, lease id, block height"
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    value={this.state.searchText}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur} />
                {textIsNotEmpty && <div className="clear grid-item-fixed" onClick={this.handleClearClick}>
                    <svg width="24px" height="16px" viewBox="0 0 24 16">
                        <path d="M23.28,0.5 C23.4703093,0.498131516 23.6534671,0.57242527 23.7886984,0.706341762 C23.9239296,0.840258255 24.0000092,1.02268154 24,1.213 L24,14.787 C24,15.183 23.68,15.5 23.28,15.5 L6.005,15.5 C5.658,15.5 5.339,15.342 5.125,15.077 L0.14,8.66 C-0.0464695963,8.39960718 -0.0464695963,8.04939282 0.14,7.789 L5.125,0.949 C5.339,0.658 5.685,0.5 6.032,0.5 L23.28,0.5 Z M17.255,10.086 L17.254,10.086 L15.148,8 L17.256,5.914 L15.656,4.329 L13.55,6.415 L11.444,4.329 L9.844,5.914 L11.95,8 L9.843,10.086 L11.443,11.671 L13.55,9.585 L15.655,11.671 L17.255,10.086 Z" id="Path-2" fillRule="nonzero"></path>
                    </svg>
                    Clear</div>}
            </div>
        );
    }
}

export default withRouter(Search);
