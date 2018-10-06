import React from 'react';
import PropTypes from 'prop-types';

export default class Search extends React.PureComponent {
    static propTypes = {
        onSearch: PropTypes.func
    };

    static defaultProps = {
        onSearch: () => (new Promise(resolve => setTimeout(resolve, 1000)))
    };

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

    handleKeyUp = async (e) => {
        if (e.key === 'Enter') {
            this.setState({
                isFailed: false,
                isLoading: true
            });
            try {
                await this.props.onSearch(this.state.searchText);
                this.setState({
                    searchText: '',
                    isLoading: false
                });
            } catch (err) {
                this.setState({
                    isLoading: false,
                    isFailed: true
                });
            }
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
            className += ' invalid';
        }

        if (this.state.isFocused) {
            className += ' focus';
        } else if (textIsNotEmpty) {
            className += ' active';
        }

        if (this.state.isLoading) {
            className += ' loading';
        }

        return (
            <div className={className}>
                <div className="search grid-item-fixed"></div>
                <input
                    ref={this.inputRef}
                    placeholder="Search address, TX id, block sig"
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    value={this.state.searchText}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur} />
                {textIsNotEmpty && <div className="clear grid-item-fixed" onClick={this.handleClearClick}>Clear</div>}
            </div>
        );
    }
}
