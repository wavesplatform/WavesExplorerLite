import React from 'react';
import {withRouter} from "../../withRouter";

class GoBack extends React.PureComponent {
    state = {
        enabled: true
    };

    componentDidMount() {
        if (window.history.length === 1)
            this.setState({enabled: false});
    }

    handleClick = () => {
        if (this.state.enabled) {
            this.props.navigate(-1);
        }
    };

    render() {
        const linkClassName = this.state.enabled ? 'no-accent' : 'fade';

        return (
            <div className="back" onClick={this.handleClick}>
                <span className="btn btn-back"></span>
                <a className={linkClassName}>Back</a>
            </div>
        );
    }
}

export const RoutedGoBack = withRouter(GoBack);
