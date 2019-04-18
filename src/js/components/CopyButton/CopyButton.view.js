import React from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';

const CopyButton = ({text, onCopy, className}) => {
    return <CopyToClipboard text={text} onCopy={onCopy}>
        <div className={'btn btn-copy ' + className || ''}>Copy</div>
    </CopyToClipboard>
};

CopyButton.propTypes = {
    text: PropTypes.string,
    onCopy: PropTypes.func
};

CopyButton.defaultProps = {
    text: '',
    onCopy: undefined
};

const Copied = () => <div className="copied">Copied!</div>;

export {CopyButton, Copied};
