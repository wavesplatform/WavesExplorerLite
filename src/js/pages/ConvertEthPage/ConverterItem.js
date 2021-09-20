import React, { useState } from 'react';
import CopyToClipboard from "react-copy-to-clipboard";

export const ConverterItem = (props) => {
    const [value, setValue] = useState('');
    const [convertedValue, setConvertedValue] = useState('');

    const convert = () => {
        setConvertedValue(props.handleConvert(value))
    }

    return <>
        <div className="converter-item">
            <div>{props.title}</div>
            <input className="converter-item-field" value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>

        <div className="converter-icon" onClick={convert}>
            <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(0.181934, 0, 0, 0.162762, 0.000226, -0.000089)">
                    <path fill="#9BA6B2" clip-rule="evenodd"
                          d="M38.884,13.221c-0.041,1.756,0.255,2.601,1.781,2.603h36.71 c6.647,0.521,12.596,2.272,17.625,5.684c3.492,2.369,6.04,5.183,7.963,8.302c3.412,5.537,5.34,13.521,6.384,19.967 c0.45,2.787,0.661,5.392,0.18,6.6c-0.228,0.569-0.565,0.953-1.023,1.135c-2.524,1.011-5.192-2.464-6.614-4.127 c-6.77-7.918-16.61-11.194-28.212-11.809h-33.56c-1.201,0.208-1.627,1.096-1.507,2.466v9.451c-0.07,3.141-1.654,4.21-4.794,3.15 L4.92,33.966l-2.842-2.231l-0.727-0.57c-2.323-2.089-1.368-3.991,0.717-5.633l2.206-1.736L31.964,1.999 c3.379-2.661,6.92-3.373,6.92,2.362V13.221L38.884,13.221z M71.042,109.66c0.041-1.757-0.254-2.602-1.78-2.604h-36.71 c-6.647-0.521-12.596-2.271-17.625-5.684c-3.514-2.384-6.072-5.217-7.998-8.358c-3.485-5.686-5.757-14.941-6.591-21.583 c-0.266-2.119-0.321-3.966,0.063-4.927c0.227-0.569,0.565-0.953,1.022-1.136c2.524-1.011,5.192,2.464,6.614,4.127 c6.771,7.918,16.611,11.194,28.213,11.809h33.56c1.2-0.207,1.627-1.096,1.507-2.466v-9.451c0.07-3.141,1.654-4.21,4.794-3.15 l28.896,22.677l2.843,2.231l0.727,0.57c2.323,2.089,1.367,3.991-0.718,5.633l-2.205,1.736l-27.689,21.797 c-3.38,2.661-6.921,3.373-6.921-2.362V109.66L71.042,109.66z"/>
                </g>
            </svg>
        </div>

        <div className="converter-item">
            <div>{props.convertedTitle}</div>
            <div className="converter-item-field">
                {convertedValue}
                <CopyToClipboard text={convertedValue}>
                    <div className="copy-btn"></div>
                </CopyToClipboard>
            </div>
        </div>
    </>
}
