import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

class Forgotpass extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            found: -1
        }
    } 
   
    Form = () => (
        <>
            <a href="#h">Forgot Password</a>
            <hr />
            <br />
            <Formik
                initialValues={{email: ""}}
                onSubmit={(values, { setSubmitting ,resetForm}) => {
                    setSubmitting(true);
                    fetch( this.props.backend_url + '/frgtpass', {
                        method:'post',
                        headers:{'Content-Type':'application/json'},
                        body: JSON.stringify({
                            email: values.email
                        })
                    }).then(response => response.json())
                    .then(data => {
                        if(data === 'sucess'){
                            this.setState({found:1});
                        }
                        else{
                            this.setState({found:0});
                        }
                    });
                    resetForm({values:''});
                }}

                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email("invalid email")
                        .required("Required")
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
                            <p>Enter email or username to reset password</p>
                            <input
                                type="email"
                                placeholder="Email"
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${errors.email && touched.email ? 'error' : 'nb'}`}
                            />
                            {errors.email && touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                            <br />
                            {this.state.found===1 && <p>Password Reset Email Sent Please Check your Email.</p>}
                            {this.state.found === 0 && <p>No such User Found!</p>}
                            <button className="btn2 signup-btn" disabled={isSubmitting} type='submit'>Reset Password</button>
                            <button className="btn1 login-btn" type='button' onClick={this.props.frgtpass}>Log In</button>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
    render(){
        return <this.Form/>
    }
}

export default Forgotpass;