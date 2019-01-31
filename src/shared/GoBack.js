import React from 'react';
import {withRouter} from 'react-router';

class GoBack extends React.PureComponent {
    state = {
        enabled: true
    };

    componentDidMount() {
        if (this.props.history.length === 1)
            this.setState({enabled: false});
    }

    handleClick = () => {
        if (this.state.enabled) {
            this.props.history.goBack();
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

export default withRouter(GoBack);
