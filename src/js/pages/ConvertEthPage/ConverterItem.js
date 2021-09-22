import React, {useState} from 'react';
import CopyToClipboard from "react-copy-to-clipboard";

export function ConverterItem(props) {
    const [value, setValue] = useState('');
    const [convertedValue, setConvertedValue] = useState('');

    const convert = () => {
        if (!!value.length) setConvertedValue(props.handleConvert(value))
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') convert()
    }

    return <div className="converter-wrapper">
        <div className="converter-item">
            <div className="converter-item-title">{props.title}</div>
            <input className="converter-item-field"
                   value={value}
                   onChange={(e) => setValue(e.target.value)}
                   onKeyPress={e => handleKeyPress(e)}
            />
        </div>

        <div className="converter-icon" onClick={convert}>
            <svg height="20px" id="Layer_1" version="1.1" viewBox="0 0 30 20" width="30px"
                 xmlns="http://www.w3.org/2000/svg">
                <polygon points="15 -5 5 10 10.833 10 10.833 25 19.167 25 19.167 10 25 10"
                         transform="matrix(0, 1, -1, 0, 25, -5)" fill="#1F5AF6"/>
            </svg>
        </div>

        <div className="converter-item">
            <div>{props.convertedTitle}</div>
            <div className="converter-item-field">
                <p>{convertedValue}</p>
                <CopyToClipboard text={convertedValue}>
                    <div className="copy-btn"/>
                </CopyToClipboard>
            </div>
        </div>
    </div>
}
