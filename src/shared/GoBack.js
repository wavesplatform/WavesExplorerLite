import React from 'react';

export default class GoBack extends React.PureComponent {
    render() {
        return (
            <div className="back">
                <span className="btn btn-back"></span>
                <a className="no-accent">Back</a>
            </div>
        );
    }
}
