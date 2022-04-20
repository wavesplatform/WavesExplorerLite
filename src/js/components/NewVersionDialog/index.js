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
                        The new Waves explorer is available. You can switch the old interface to the new one and feel the differences. Try the new version right now and give us feedback via Intercom.
                    </div>
                    <button className="nvd-btn" onClick={this.onClickNewVersion.bind(this)}>
                        Switch to the new version
                    </button>
                </div>
            </div>
        )
    }
}
