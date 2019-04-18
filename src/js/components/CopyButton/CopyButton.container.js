import React from 'react';
import {CopyButton, Copied} from './CopyButton.view';

const MESSAGE_DELAY_MILLISECONDS = 1000;

export class CopyButtonContainer extends React.PureComponent {
    static propTypes = CopyButton.propTypes;
    static defaultProps = CopyButton.defaultProps;

    state = {
        hasCopied: false
    };

    handleCopy = (text, result) => {
        if (this.props.onCopy) {
            this.props.onCopy(text, result);
        }

        this.setState({hasCopied: true});
        setTimeout(() => this.setState({hasCopied: false}), MESSAGE_DELAY_MILLISECONDS);
    };

    render() {
        return this.state.hasCopied ? <Copied /> : <CopyButton className={this.props.className} text={this.props.text} onCopy={this.handleCopy} />;
    }
}
