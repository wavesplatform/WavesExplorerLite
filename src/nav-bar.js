import React from 'react';

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="menu grid-item-fixed lg-hide">
                 <div>
                     <div className="network-switcher">
                         <div className="current">Mainnet</div>
                         <div>Testnet</div>
                     </div>
                 </div>
                 <div className="menu-list">
                     <div className="menu-item current">General info</div>
                     <div className="menu-item">Blocks</div>
                     <div className="menu-item">Peers</div>
                     <div className="menu-item">Nodes</div>
                 </div>
                 <div className="menu-footer">
                     <div>Version: v1.1.7</div>
                     <div>Brought to you by Waves Team</div>
                     <div>
                         <div className="social github"></div>
                         <div className="social twitter"></div>
                         <div className="social facebook"></div>
                         <div className="social discord"></div>
                         <div className="social telegram"></div>
                     </div>
                     <div><a className="fade">wavesplatform.com</a></div>
                 </div>
             </div>
        );
    }
}
