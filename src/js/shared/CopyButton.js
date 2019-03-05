import React from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';

const MESSAGE_DELAY_MILLISECONDS = 1000;

const Copy = ({text, onCopy}) => {
    return <CopyToClipboard text={text} onCopy={onCopy}>
        <div className="btn btn-copy">Copy</div>
    </CopyToClipboard>
};

Copy.propTypes = {
    text: PropTypes.string,
    onCopy: PropTypes.func
};

Copy.defaultProps = {
    text: '',
    onCopy: undefined
};

const Copied = () => <div className="copied">Copied!</div>;

class CopyButton extends React.PureComponent {
    static propTypes = Copy.propTypes;
    static defaultProps = Copy.defaultProps;

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
        return this.state.hasCopied ? <Copied /> : <Copy text={this.props.text} onCopy={this.handleCopy} />;
    }
}

export default CopyButton;
