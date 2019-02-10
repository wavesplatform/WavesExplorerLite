import React from 'react';

export default class FaucetPage extends React.Component {
    render() {
        return (
            <div className="content card card-multicolumn">
                <div className="content-side__left">
                    <div className="card faucet">
                        <div className="faucet-image"></div>
                        <form action="">
                            <label className="basic700 margin4">Testnet address</label>
                            <label className="basic500 margin6 fs12">Fill out your Testnet address to receive 10 WAVES</label>

                            <div className="margin24 fs14">
                                <input type="text" placeholder="Address" className="basic500"/>
                                <div className="input-error">Address requied</div> {/* TODO @Ishchenko - add validation */}
                                <div className="input-error">Invalid address</div>
                            </div>

                            <label className="basic700 margin6">Confirm you're a human</label>
                            <div className="captcha margin24"> {/* TODO @uIsk - remove .captcha class */}
                                {/* @Ishchenko - TODO captcha here */}
                            </div>

                            <button className="submit big long get-waves-btn disabled"> {/* @Ishchenko - addClass .disabled if empty onput field */}
                                <span>Request 10 WAVES</span>
                            </button>
                        </form>
                    </div>
                    <div className="basic500 faucet-description fs12">If you experience any problems with the faucet,
                        please contact <a href="mailto:support@wavesplatform.com">support@wavesplatform.com</a></div>
                </div>

                <div className="content-side__right">
                    <div className="card">
                        <div class="headline">
                            <span class="title">Faucet Transactions (&Counter&)</span> {/*  TODO @Ishchenko - Counter */}
                        </div>

                        {/* TODO @Ishchenko - add singleTransactionPage content here */}
                    </div>
                </div>
            </div>
        );
    }
}
