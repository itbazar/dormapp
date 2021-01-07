import React from 'react'
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom'
import axios from 'axios';

export const Login = () => {
    const history = useHistory();
    return (
        <>
            <div className="login-wrap" style={{ marginTop: '10vh' }}>
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked /><label for="tab-1" className="tab">ورود به پنل</label>
                    <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label for="tab-2" className="tab">فراموشی رمز عبور</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Required';
                                    }
                                    // } else if (
                                    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    // ) {
                                    //     errors.email = 'Invalid email address';
                                    // }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    //const apiUrl = `http://apitester.ir/api/Users/authenticate?userName=${values.email}&password=${values.password}`;
                                    const apiUrl = process.env.REACT_APP_API_URL;
                                    const loginUrl = apiUrl + process.env.REACT_APP_API_URL_LOGIN;
                                    const user = {
                                        username: values.email,
                                        password: values.password
                                    };
                                    axios.get(loginUrl, {
                                        params: user
                                    })
                                        .then(response => {
                                            if (response.status == 200) {
                                                console.log("API Login Response: " + JSON.stringify(response))
                                                localStorage.setItem('user', JSON.stringify(response.data));
                                                localStorage.setItem('token', 'testToken');
                                                localStorage.setItem('refresh-token', 'testRefreshToken');
                                                // alert(JSON.stringify(response.data));
                                                history.push('/axios');
                                            } else {
                                                alert('نام کاربری یا رمز عبور صحیح نمی باشد');
                                                alert(JSON.stringify(response));
                                            }
                                        })
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="group">
                                            <label for="email" className="label">نام کاربری</label>
                                            <Field type="text" name="email" className="input" />
                                            <ErrorMessage name="email" component="div" />
                                        </div>
                                        <div className="group">
                                            <label for="pass" className="label">رمز عبور</label>
                                            <Field type="password" name="password" className="input" />
                                            <ErrorMessage name="password" component="div" />
                                        </div>
                                        <div className="group">
                                            <button type="submit" className="button" disabled={isSubmitting}>
                                                ورود
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="hr"></div>
                        </div>
                        <div className="for-pwd-htm">
                            <div className="group">
                                <label for="user" className="label">نام کاربری یا ایمیل</label>
                                <input id="user" type="text" className="input" />
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="بازیابی رمز" />
                            </div>
                            <div className="hr"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
