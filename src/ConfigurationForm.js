import React from 'react';
import PropTypes from 'prop-types';
import CopyToClipboard from 'react-copy-to-clipboard';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

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

const ConfigurationSchema = Yup.object().shape({
    apiBaseUrl: Yup.string()
        .url('Invalid url')
        .required('Node address is required'),
    spamListUrl: Yup.string()
        .url('Invalid url')
});

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
                validationSchema={ConfigurationSchema}
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
                            <Field name="apiBaseUrl" component={InputComponent} />
                        </div>

                        <div className="row">
                            <label>Spam list</label>
                            <Field name="spamListUrl" component={InputComponent} />
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
