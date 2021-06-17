import React from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import {isWebUri, isHttpsUri} from 'valid-url';
import {nodeApi} from './shared/api/NodeApi';

const valuesShape = PropTypes.shape({
    apiBaseUrl: PropTypes.string,
    spamListUrl: PropTypes.string
});

const InputComponent = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
}) => (
    <div className="input-wrapper has-copy-button">
        <input type="text" {...field} {...props} className={errors[field.name] ? 'invalid' : ''} />
        <CopyToClipboard text={field.value}>
            <div className="copy-btn"></div>
        </CopyToClipboard>
        {touched[field.name] &&
        errors[field.name] && <div className="input-error">{errors[field.name]}</div>}
    </div>
);

const validate = values => {
    return Promise.resolve().then(() => {
        const url = values.apiBaseUrl.trim();
        if (!url) {
            throw {
                apiBaseUrl: 'Url is required'
            };
        }

        const currentProtocol = window.location.protocol;
        if (currentProtocol.startsWith('https') && !isHttpsUri(values.apiBaseUrl)) {
            throw {
                apiBaseUrl: `Invalid url. The url must match protocol definition (${currentProtocol})`
            };
        }

        if (!isWebUri(values.apiBaseUrl)) {
            throw {
                apiBaseUrl: `Invalid url`
            };
        }

        return nodeApi(values.apiBaseUrl)
            .version()
            .catch(() => {
                throw {
                    apiBaseUrl: 'Failed to connect to the specified node'
                }
            });
    }).then(versionResponse => {
        if (!versionResponse.version) {
            throw {
                apiBaseUrl: `Node has failed to report it's version`
            }
        }
    });
};

export default class ConfigurationForm extends React.Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        values: valuesShape.isRequired,
    };

    render() {
        return (
            <Formik
                initialValues={this.props.values}
                validate={validate}
                onSubmit={(values, actions) => {
                    this.props.onSubmit(values);
                    actions.setSubmitting(false);
                    this.props.onClose();
                }}
                render={({errors, status, touched, dirty, isSubmitting}) => (
                    <Form>
                        <div className="header">
                            Settings
                            <div className="close-btn" onClick={this.props.onClose}></div>
                        </div>
                        <div className="row">
                            <label>Blockchain Network</label>
                            <div className="current-network">
                                <i className="network-icon-active"></i>
                                <span>{this.props.title}</span>
                            </div>
                        </div>

                        <div className="row">
                            <label>Node address</label>
                            <Field name="apiBaseUrl" component={InputComponent} placeholder="Node absolute URL with port number" />
                        </div>

                        <div className="row buttons-wrapper">
                            <button className="interface blue" type="submit" disabled={!touched || isSubmitting}>Save and apply</button>
                        </div>
                    </Form>
                )}
            />
        );
    }
}
