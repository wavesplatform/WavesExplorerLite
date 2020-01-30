import {detect} from 'detect-browser';
import * as semver from 'semver';

const UNSUPPORTED_BROWSERS = ['ie'];

const SUPPORTED_BROWSER_MIN_VERSIONS = {
    chrome: "54.0.0",
    firefox: "64.0.0",
    opera: "58.0.0",
    safari: "10.0.0",
    edge: "15.0.0"
};

const isBrowserSupported = () => {
    const browser = detect();

    console.log('browser', browser);

    // we support unknown browsers
    if (!browser)
        return true;

    if (UNSUPPORTED_BROWSERS.indexOf(browser.name) >= 0)
        return false;

    const minVersion = SUPPORTED_BROWSER_MIN_VERSIONS[browser.name];
    // do not restrict browsers we haven't tested
    if (!minVersion)
        return true;

    return semver.gte(browser.version, minVersion, true);
};

export class BrowserService {
    isCurrentBrowserSupported() {
        if (typeof this.isSupported !== 'undefined')
            return this.isSupported;

        this.isSupported = isBrowserSupported();

        return this.isSupported;
    }
}
