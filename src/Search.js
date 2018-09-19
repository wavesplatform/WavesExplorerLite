import React from 'react';
import PropTypes from 'prop-types';

export default class Search extends React.PureComponent {
    static propTypes = {
        onSearch: PropTypes.func
    };

    static defaultProps = {
        onSearch: () => (Promise.resolve())
    };

    state = {
        isLoading: false,
        searchText: ''
    };

    handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            this.props.onSearch(this.state.searchText);
            this.setState({
                searchText: '',
                isLoading: false
            });
        }
    };

    handleChange = (e) => {
        this.setState({searchText: e.target.value});
    };

    render() {
        return (
            <div className="search-box">
                <input
                    placeholder="Search address, TX sig, block sig"
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    value={this.state.searchText}/>
            </div>
        );
    }
}
