import React from 'react';
import PropTypes from 'prop-types';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';

const RequestStatus = ({status}) => {
    if (!status) {
        return null;
    }

    const className = 'faucetValidation ' + (status.successful ? 'valid' : 'invalid');
    const message = status.message || 'Your request was successfully submitted please check your wallet';

    return (
        <div className={className}>
            <div className="status-icon"></div>
            <div>{message}</div>
        </div>
    );
};

export function RequestForm({networkName, onSubmit, validateAddress, status, amount = '2'}) {
    const {executeRecaptcha} = useGoogleReCaptcha();

    const validate = (values) => {
        return Promise
            .resolve()
            .then(() => {
                let errors = {};

                if (!values.address) {
                    errors.address = 'Address is required';
                } else if (values.address.trim().length === 0) {
                    errors.address = 'Address must be non-empty';
                }

                if (Object.keys(errors).length) {
                    throw errors;
                }
            })
            .then(() => validateAddress(values.address))
            .then(addressValid => {
                if (!addressValid) {
                    throw {address: 'Invalid address'};
                }
            });
    };

    const handleSubmit = async (values, actions) => {
        const captchaToken = await executeRecaptcha('faucet_request');
        await onSubmit({...values, captchaToken});
        actions.setSubmitting(false);
    };

    return (
        <Formik
            validate={validate}
            initialValues={{address: ''}}
            onSubmit={handleSubmit}
            validateOnChange={false}
            render={({errors, isSubmitting, isValidating, isValid}) => (
                <Form>
                    <label className="basic700 margin4">{networkName} Address</label>
                    <label className="basic500 margin6 fs12">Fill out your {networkName} address to receive {amount} WAVES</label>

                    <div className="margin24 fs14">
                        <Field name="address" type="text" placeholder="Address" className="basic500" />
                        <ErrorMessage component="div" name="address" className="input-error" />
                    </div>

                    <RequestStatus status={status}/>

                    <button className="submit big long get-waves-btn" type="submit" disabled={!isValid || isSubmitting || isValidating}>
                        <span>Request {amount} WAVES</span>
                    </button>
                </Form>
            )}
        />
    );
}

RequestForm.propTypes = {
    networkName: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    validateAddress: PropTypes.func.isRequired,
    amount: PropTypes.string,
    status: PropTypes.shape({
        successful: PropTypes.bool.isRequired,
        message: PropTypes.string
    })
};
