import React from 'react';

export default class Search extends React.PureComponent {
    render() {
        return (
            <div className="search-box">
                <input placeholder="Search address, TX sig, block sig"/>
            </div>
        );
    }
}
