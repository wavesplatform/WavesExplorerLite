import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <div className="header grid">
            <div className="header-title grid-item-fixed grid">
                <div className="menu-toggle grid-item-fixed lg-show" onClick={() => props.onMenuToggle()}></div>
                <div className="logo"></div>
            </div>
            {props.children}
        </div>
    );
};

Header.propTypes = {
    onMenuToggle: PropTypes.func.isRequired
};

export default Header;
