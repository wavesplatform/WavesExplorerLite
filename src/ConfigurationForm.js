import React from 'react';
import PropTypes from 'prop-types';
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
        <button className="copy-btn"></button> {/* TODO ischenko */}
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
        .required('Spam list url is required')
});

export default class ConfigurationForm extends React.Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        defaultValues: valuesShape.isRequired,
        currentValues: valuesShape.isRequired
    };

    render() {
        const {currentValues, defaultValues} = this.props;
        const isDefault = currentValues.apiBaseUrl == defaultValues.apiBaseUrl &&
            currentValues.spamListUrl == defaultValues.spamListUrl;
        return (
            <Formik
                initialValues={this.props.currentValues}
                validationSchema={ConfigurationSchema}
                onSubmit={(values, actions) => {
                    this.props.onSubmit(values);
                    actions.setSubmitting(false);
                    this.props.onClose();
                }}
                onReset={(values, actions) => {
                    Object.keys(this.props.defaultValues).forEach(key => {
                        values[key] = this.props.defaultValues[key];
                    });

                    actions.setTouched(true);
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
                            <button className="interface grey" type="reset" disabled={!touched && isDefault}>Set Default</button> {/* TODO ischenko | add attr='disabled' if by default = true  */}
                            <button className="interface blue" type="submit" disabled={!touched || isSubmitting}>Save and apply</button> {/* TODO ischenko | add attr='disabled' if wasChanged = false */}
                        </div>
                    </Form>
                )}
            />
        );
    }
}
