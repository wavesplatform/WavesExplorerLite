import React from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';

const CopyButton = ({text, onCopy}) => {
    return <CopyToClipboard text={text} onCopy={onCopy}>
        <div className="btn btn-copy">Copy</div>
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

export default CopyButton;
