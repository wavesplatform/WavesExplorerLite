import React from 'react';
import brick from "../../../images/brick.svg";
import {TOOLTIP_ID} from "../../shared/constants";

class FailedBrick extends React.Component {

    render() {

        return <>
            <img  data-for={TOOLTIP_ID} data-tip="With failed script result" className="icon" src={brick} height={12} width={12}/>
            &nbsp;
        </>
    }
}

export default FailedBrick;
