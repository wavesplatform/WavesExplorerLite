import React from 'react';

export default class Pagination extends React.Component {
    render() {
        return (
            <div className="page-navigation right">
                <span className="page-link first disabled">First</span>
                <span className="page current">1</span>
                <span className="page">2</span>
                <span className="page">3</span>
                <span className="page">4</span>
                <span className="page">5</span>
                <span className="page">...</span>
                <span className="page-link last">Last</span>
            </div>
        );
    }
}
