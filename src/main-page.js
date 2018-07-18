import React from 'react';

export default class MainPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="info-box grid grid-wrap">
                     <div className="column-sm-6 column-md-4">
                         <div className="line"><label>Version:</label></div>
                         <div className="line">Waves v0.13.3</div>
                     </div>
                     <div className="column-sm-6 column-md-4">
                         <div className="line"><label>Current height:</label></div>
                         <div className="line">1040039</div>
                     </div>
                     <div className="column-sm-6 column-md-4">
                         <div className="line"><label>History sync status:</label></div>
                         <div className="line">N/A</div>
                     </div>
                     <div className="column-sm-6 column-md-4">
                         <div className="line"><label>Algo:</label></div>
                         <div className="line">waves</div>
                     </div>
                     <div className="column-sm-6 column-md-4">
                         <div className="line"><label>Base Target:</label></div>
                         <div className="line">57</div>
                     </div>
                     <div className="column-sm-6 column-md-4">
                         <div className="line"><label>Avg Block delay:</label></div>
                         <div className="line">1.01 minutes</div>
                     </div>
                 </div>
                 <div className="grid grid-wrap">
                     <div className="column-6 column-sm-12 panel">
                         <div className="headline">
                             <span className="title">Last blocks</span>
                         </div>
                         <div className="grid panel-row">
                             <div className="block-img grid-item-fixed"></div>
                             <div>
                                 <div className="line">Block <a>1040038</a> contains <span className="bold">00</span> transactions</div>
                                 <div className="line no-wrap"><label>Signature: 3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564</label></div>
                             </div>
                             <div className="divider divider-dashed md-hide sm-show grid-item-fixed"></div>
                             <div className="md-hide sm-show grid-item-fixed">
                                 <div className="line"><label>17:19:57</label></div>
                                 <div className="line"><label>13.06.2018</label></div>
                             </div>
                         </div>
                         <div className="grid panel-row">
                             <div className="block-img grid-item-fixed"></div>
                             <div>
                                 <div className="line">Block <a>1040038</a> contains <span className="bold">00</span> transactions</div>
                                 <div className="line no-wrap"><label>Signature: 3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564</label></div>
                             </div>
                             <div className="divider divider-dashed md-hide sm-show grid-item-fixed"></div>
                             <div className="md-hide sm-show grid-item-fixed">
                                 <div className="line"><label>17:19:57</label></div>
                                 <div className="line"><label>13.06.2018</label></div>
                             </div>
                         </div>
                         <div className="grid panel-row">
                             <div className="block-img grid-item-fixed"></div>
                             <div>
                                 <div className="line">Block <a>1040038</a> contains <span className="bold">00</span> transactions</div>
                                 <div className="line no-wrap"><label>Signature: 3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564</label></div>
                             </div>
                             <div className="divider divider-dashed md-hide sm-show grid-item-fixed"></div>
                             <div className="md-hide sm-show grid-item-fixed">
                                 <div className="line"><label>17:19:57</label></div>
                                 <div className="line"><label>13.06.2018</label></div>
                             </div>
                         </div>
                         <div className="grid panel-row">
                             <div className="block-img grid-item-fixed"></div>
                             <div>
                                 <div className="line">Block <a>1040038</a> contains <span className="bold">00</span> transactions</div>
                                 <div className="line no-wrap"><label>Signature: 3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564</label></div>
                             </div>
                             <div className="divider divider-dashed md-hide sm-show grid-item-fixed"></div>
                             <div className="md-hide sm-show grid-item-fixed">
                                 <div className="line"><label>17:19:57</label></div>
                                 <div className="line"><label>13.06.2018</label></div>
                             </div>
                         </div>
                     </div>
                     <div className="panel column-6 column-sm-12">
                         <div className="headline">
                             <div className="title">Unconfirmed Transactions (1)</div>
                         </div>
                         <div className="grid panel-row">
                             <div className="divider divider-utx grid-item-fixed"></div>
                             <div>
                                 <div className="line no-wrap"><a>3VrorJrm9g1zHeFoDERX6nFhpZnwmedTgncQUC5Gp4E564</a></div>
                                 <div className="line">
                                     <label>Amount</label> 00000000.00000000
                                     <label className="right">Fee 0.001</label>
                                 </div>
                                 <div className="line wide">
                                     <a className="no-accent">Sender</a>
                                     <a className="no-accent">Recipient</a>
                                 </div>
                             </div>
                             <div className="divider divider-dashed md-hide sm-show grid-item-fixed"></div>
                             <div className="md-hide sm-show grid-item-fixed">
                                 <div className="line"><label>17:19:57</label></div>
                                 <div className="line"><label>13.06.2018</label></div>
                                 <div className="line wide"><label>Type 9</label></div>
                             </div>
                         </div>
                     </div>
                 </div>
            </React.Fragment>
        );
    }
}
