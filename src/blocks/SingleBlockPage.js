import React from 'react';
import PropTypes from 'prop-types';

import GoBack from '../shared/GoBack';

export default class SingleBlockPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <GoBack />
                <div className="headline">
                  <span className="title">Block</span>
                  <span className="title-details"> / 1050558</span>
                </div>
                <div className="dictionary">
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key"><span>Height</span></div>
                    <div className="dictionary-pair-value">
                      <span className="btn btn-prev"></span>
                      <span>1050558</span>
                      <span className="btn btn-next disabled"></span>
                    </div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Version</div>
                    <div className="dictionary-pair-value">3</div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Timestamp</div>
                    <div className="dictionary-pair-value">00:00:00, 00.00.0000</div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Transactions</div>
                    <div className="dictionary-pair-value">38</div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Parent block</div>
                    <div className="dictionary-pair-value">5wuKEcCfaRoFgudC6QBcyp98mJcV2zFDQBV6hVEh7C9H7pVpEzBvh2BveVdncRJHMXzig4JU6jfEiHCv6auFGBah</div>
                    <div className="dictionary-action"><div className="btn btn-copy">Copy</div></div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Generator</div>
                    <div className="dictionary-pair-value"><a>3P7apYh75mQJxdsZYH9of7JwcfwzbZUtL8N</a></div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key"><span>Signature</span></div>
                    <div className="dictionary-pair-value">5TabAZrDMQHmVHoVN1kzie54UwBoQfv93FpB2GsT5MEBSWsWecoqQmrRx4MhCMH8NQH1xNdsqXZ4UPLLEue7iUFb</div>
                    <div className="dictionary-action"><div className="btn btn-copy">Copy</div></div>
                  </div>
                  <div className="dictionary-pair">
                    <div className="dictionary-pair-key">Size</div>
                    <div className="dictionary-pair-value">16249 bytes</div>
                  </div>
                </div>
                <div className="headline2">
                  <span className="title">Transactions</span>
                  <span className="title-details"> — Type 4</span>
                  <span className="action">Hide list</span>
                </div>
                <table className="table-sm-transform">
                  <thead>
                    <tr>
                      <th>ID / Timestamp</th>
                      <th>Sender / Recipient</th>
                      <th className="amount">Amount / Fee</th>
                      <th className="price">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-label="ID / Timestamp">
                        <div className="line no-wrap"><a>CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS</a></div>
                        <div className="line"><label>00:00:00, 00.00.0000</label></div>
                      </td>
                      <td data-label="Sender / Recipient">
                        <div className="arrow arrow-transaction-receive"></div>
                        <div className="line no-wrap"><a className="no-accent">3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he</a></div>
                        <div className="line no-wrap"><a className="no-accent">3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3</a>></div>
                      </td>
                      <td data-label="Amount / Fee">
                        <div className="line">1000.0000000</div>
                        <div className="line"><label>0.001 WAVES</label></div>
                      </td>
                      <td data-label="Price">
                        <div className="line"><a>XDTC</a></div>
                      </td>
                    </tr>
                    <tr>
                      <td data-label="ID / Timestamp">
                        <div className="line no-wrap"><a>CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS</a></div>
                        <div className="line"><label>00:00:00, 00.00.0000</label></div>
                      </td>
                      <td data-label="Sender / Recipient">
                        <div className="arrow arrow-transaction-receive"></div>
                        <div className="line no-wrap"><a className="no-accent">3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he</a></div>
                        <div className="line no-wrap"><a className="no-accent">3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3</a>></div>
                      </td>
                      <td data-label="Amount / Fee">
                        <div className="line">1000.0000000</div>
                        <div className="line"><label>0.001 WAVES</label></div>
                      </td>
                      <td data-label="Price">
                        <div className="line"><a>XDTC</a></div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="headline2">
                  <span className="title">Exchanges</span>
                  <span className="title-details"> — Type 7</span>
                  <span className="action">Hide list</span>
                </div>
                <table className="table-sm-transform">
                  <thead>
                  <tr>
                    <th>ID / Timestamp</th>
                    <th>Seller / Buyer</th>
                    <th className="amount">Amount / Total</th>
                    <th className="price">Pair / Price</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td data-label="ID / Timestamp">
                      <div className="line no-wrap"><a>CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS</a></div>
                      <div className="line"><label>00:00:00, 00.00.0000</label></div>
                    </td>
                    <td data-label="Seller / Buyer">
                      <div className="arrow arrow-transaction-exchange"></div>
                      <div className="line no-wrap"><a className="no-accent">3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he</a></div>
                      <div className="line no-wrap"><a className="no-accent">3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3</a>></div>
                    </td>
                    <td data-label="Amount / Total">
                      <div className="line">7.69536906</div>
                      <div className="line bold">406.70541687</div>
                    </td>
                    <td data-label="Pair / Price">
                      <div className="line"><a>ZEC</a> / WAVES</div>
                      <div className="line bold">53.24051565</div>
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div className="headline2">
                  <span className="title">Leasing</span>
                  <span className="title-details"> — Type 8</span>
                  <span className="action">Hide list</span>
                </div>
                <table className="table-sm-transform">
                  <thead>
                  <tr>
                    <th>ID / Timestamp</th>
                    <th>Sender / Recipient</th>
                    <th className="amount">Amount / Fee</th>
                    <th className="price"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td data-label="ID / Timestamp">
                      <div className="line no-wrap"><a>CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS</a></div>
                      <div className="line"><label>00:00:00, 00.00.0000</label></div>
                    </td>
                    <td data-label="Sender / Recipient">
                      <div className="arrow arrow-transaction-masspay"></div>
                      <div className="line no-wrap"><a className="no-accent">3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he</a></div>
                      <div className="line no-wrap"><a className="no-accent">3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3</a>></div>
                    </td>
                    <td data-label="Amount / Fee">
                      <div className="line">1000.0000000</div>
                      <div className="line"><label>0.001 WAVES</label></div>
                    </td>
                  </tr>
                  </tbody>
                </table>

                <div className="headline2">
                  <span className="title">Cancel leasing </span>
                  <span className="title-details"> — Type 9</span>
                  <span className="action">Unhide list</span>
                </div>
                <table className="table-sm-transform table-hide">
                  <thead>
                  <tr>
                    <th>ID / Timestamp</th>
                    <th>Seller / Buyer</th>
                    <th className="amount">Amount / Total</th>
                    <th className="price">Pair / Price</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td data-label="ID / Timestamp">
                      <div className="line no-wrap"><a>CTAdvY5n3VsYg9LQz432FDSTAdvY5n3VsYg9LQz432FDS</a></div>
                      <div className="line"><label>00:00:00, 00.00.0000</label></div>
                    </td>
                    <td data-label="Seller / Buyer">
                      <div className="line no-wrap"><a className="no-accent">3PGaVDYAZ4FvDxTQuCi26BHam8dZJPQS9he</a></div>
                      <div className="line no-wrap"><a className="no-accent">3PJaDyprvekvPXPuAtxrapacuDJopgJRaU3</a>></div>
                    </td>
                    <td data-label="Amount / Total">
                      <div className="line">7.69536906</div>
                      <div className="line bold">406.70541687</div>
                    </td>
                    <td data-label="Pair / Price">
                      <div className="line"><a>ZEC</a> / WAVES</div>
                      <div className="line bold">53.24051565</div>
                    </td>
                  </tr>
                  </tbody>
                </table>
            </React.Fragment>
        );
    }
}
