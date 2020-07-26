import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reseted: false
        }
    }
    ResetForm = () => (
        <>
            <a href="/">Reset Password</a>
            <hr />
            <br />
            <Formik
                initialValues={{ password: "" }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    fetch(this.props.backend_url + '/passreset', {
                        method: 'post',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            password: values.password
                        })
                    }).then(response => response.json())
                        .then(data => {
                            if (data === 'sucess') {
                                this.setState({ reseted: true });
                            }
                            else {
                                this.setState({ reseted: false });
                            }
                        });
                    resetForm({ values: '' });
                }}

                validationSchema={Yup.object().shape({
                    password: Yup.string()
                        .required("No password provided.")
                        .min(8, "Password too short - minimum 8 characters reuired.")
                        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, "Password must contain a number,Uppercase & a special character.") // eslint-disable-line

                })}
            >
                {props => {
                    const {
                        values,// eslint-disable-line
                        touched,// eslint-disable-line
                        errors,// eslint-disable-line
                        dirty,// eslint-disable-line
                        isSubmitting,// eslint-disable-line
                        handleChange,// eslint-disable-line
                        handleBlur,// eslint-disable-line
                        handleSubmit,// eslint-disable-line
                        handleReset// eslint-disable-line
                    } = props;
                    return (
                        <form method='post' onSubmit={handleSubmit}>
                            <p>Enter your new password </p>
                            <input
                                type="password"
                                placeholder="password"
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${errors.password && touched.password ? 'error' : 'nb'}`}
                            />
                            {errors.password && touched.password && (
                                <div className="input-feedback">{errors.password}</div>
                            )}
                            <br />
                            {this.state.reseted && <p className='err'>Password Reseted Succesfully, Redirecting...</p>}
                            {!this.state.reseted && <p className='err'>Something went wrong!</p>}
                            <button className="btn2 signup-btn" disabled={isSubmitting} type='submit'>Reset Password</button>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
    render() {
        return (
            <div className='wrapper'>

                <div className='login-text expand ll'>
                    <div className='text fl'>
                        <div className='frgt'>
                            <this.ResetForm />
                        </div>
                    </div>
                </div>
                <div className='call-text'></div>
            </div>
        );
    }
}

export default ResetPass;