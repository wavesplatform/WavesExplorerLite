import * as Sentry from '@sentry/browser';

export class ErrorReportingService {
    constructor(sentryDsn) {
        this.dsn = sentryDsn;
    }

    initialize() {
        Sentry.init({
            dsn: this.dsn
        });
    }

    captureException(error) {
        Sentry.captureException(error);
    }

    captureComponentError(error, errorInfo) {
        if (!errorInfo) {
            this.captureException(error);

            return;
        }

        Sentry.withScope(scope => {
            Object.keys(errorInfo).forEach(key => {
                scope.setExtra(key, errorInfo[key]);
            });
            Sentry.captureException(error);
        });
    }

    showReportDialog() {
        Sentry.showReportDialog();
    }
}
