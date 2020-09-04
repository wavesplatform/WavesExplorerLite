import React from 'react';
import Loader from "../../components/Loader";
import PropTypes from "prop-types";

class RawJsonViewer extends React.Component {

    state = {open: false}

    clickHandler = () => {
        this.setState(prevState => ({open: !prevState.open}));
    };

    defaultFetchData = async () => {
    }

    render() {
        const {open} = this.state;
        const {json, fetchData} = this.props;
        return <>
            {open &&
            <Loader fetchData={fetchData || this.defaultFetchData} errorTitle="Failed to load transaction JSON">
                <div className="data-container margin6">
                    <pre>{JSON.stringify(json || {}, null, 2)}</pre>
                </div>
            </Loader>}
            <Button caption={open ? 'Hide' : 'Show'} clickHandler={this.clickHandler}/>
        </>
    }
}

RawJsonViewer.propTypes = {
    json: PropTypes.object,
    fetchData: PropTypes.func
};


export default RawJsonViewer

const Button = ({caption, clickHandler}) => (
    <div className="btn btn-toggle" onClick={clickHandler}>{caption}</div>
);
