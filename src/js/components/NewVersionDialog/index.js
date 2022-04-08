import React from 'react';
import { isDialogEnabled, setRedirectCookie } from './helpers'

export class NewVersionDialog extends React.Component {

    onClickNewVersion() {
        setRedirectCookie();
        window.location.reload();
    }

    render() {

        if (!isDialogEnabled()) {
            return null;
        }

        return (
            <div className="new-version-dialog-container">
                <div className="nvd-icon"></div>
                <div className="nvd-content">
                    <h1 className="nvd-title">New Waves Explorer</h1>
                    <div className="nvd-descr">
                        The new Waves Explorer is available! You can transfer from old interface to new one on any page and feel differences. Give us feedback via Intercom.
                    </div>
                    <button className="nvd-btn" onClick={this.onClickNewVersion.bind(this)}>
                        Go to new site
                    </button>
                </div>
            </div>
        )
    }
}
