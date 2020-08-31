import React, { Component } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";

class Signup extends Component{

    constructor(props) {
        super(props);
        this.state = {
            isregistered:0
        }
    } 

    filebtn=(e)=>{
        this.inputElement.click();
    }

    signstate = () =>{
        this.props.signupfunc();
        this.setState({isregistered:0});
    }
    
    render(){
    return (
    <>
        <a href="/#">Sign-Up</a>
        <hr />
        <Formik
            initialValues={{ name: "", user: "", email: "", password: ""}}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                fetch(this.props.backend_url + '/register', {
                        method:'post',
                        headers:{'Content-Type':'application/json'},
                        body: JSON.stringify({
                            name: values.name,
                            username: values.user,
                            email: values.email,
                            password: values.password
                        })
                    }).then(response=>response.json())
                    .then(data => {
                        if(data.status === 'sucess'){
                            this.props.loaduser(data);
                            this.props.signclick('home')
                        }
                        else{
                            this.setState({isregistered:1});
                        }
                    }).catch(console.log('cant register!'));
                    resetForm({values: ''});

                }}

            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .trim()
                    .required("required")
                    .matches(/^[a-z A-Z]+$/,"invalid name"),// eslint-disable-line
                email: Yup.string()
                    .trim()
                    .email()
                    .required("Required"),
                user: Yup.string()
                    .trim()
                    .required("Required")
                    .min(4,"too short")
                    .matches(/^[a-zA-Z0-9\_\.]+$/,"invalid username"),  // eslint-disable-line
                password: Yup.string()
                    .required("No password provided.")
                    .min(8, "Password too short - minimum 8 characters reuired.")
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, "Password must contain a number,Uppercase & a special character."),//eslint-disable-line
                /*phone: Yup.string()
                .required("required")
                .matches(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/,"invalid number"),//eslint-disable-line*/
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
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Name"
                            name='name'
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`top ${errors.name && touched.name ? 'error' : 'nb'}`}
                        />
                        {errors.name && touched.name && (
                            <div className="input-feedback">{errors.name}</div>
                        )}

                        <input
                            type="text"
                            placeholder="UserName"
                            name='user'
                            value={values.user}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${errors.user && touched.user ? 'error' : 'nb'}`}
                        />
                        {errors.user && touched.user && (
                            <div className="input-feedback">{errors.user}</div>
                        )}

                        <input
                            type="text"
                            name='email'
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${errors.email && touched.email ? 'error' : 'nb'}`}
                        />
                        {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                        )}

                        <input
                            type="password"
                            name='password'
                            placeholder="Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${errors.password && touched.password ? 'error' : 'nb'}`}
                        />

                        {errors.password && touched.password && (
                            <div className="input-feedback">{errors.password}</div>
                        )}
                        <br />
                        {(this.state.isregistered===1 && <p className='err'>Already Registered or Username is Taken!</p>) || (this.props.greg === 1 && <p className='err'>Already Registered!</p>)}
                        <a className='forgotp' href='/#'><p className='nt' onClick={this.signstate}>Already Registered?</p></a>
                        <button className="btn2 login-btn" disabled={isSubmitting} type='submit'>Register</button>
                    </form>
                );
            }}
        </Formik>
    </>
    );
}
}
export default Signup;
