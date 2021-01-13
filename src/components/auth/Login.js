import React,{useState,useEffect} from 'react'
import './Login.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import DormTypeCombo from 'custom-components/DormTypeCombo';
import { loginUser } from 'services/dormService';
import { Loading } from 'custom-components/Loading';

export const Login = () => {
    const history = useHistory();
     const [dormType, setDormType] = useState("https://tgs.ui.ac.ir/api")
    //  const [isLoading, setIsLoading] = useState(true);
     useEffect(() => {
        localStorage.setItem('dorm-api',  JSON.stringify(dormType));
        console.log("DormType: " + JSON.stringify(dormType))
     }, [dormType])

    return (
        <>
            <div className="login-wrap" >
                <div className="login-html">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked /><label for="tab-1" className="tab">تردد خوابگاه</label>
                    <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label for="tab-2" className="tab"></label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <Formik
                                initialValues={{ username: '', password: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.username) {
                                        errors.username = 'Required';
                                    }
                                    // } else if (
                                    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
                                    // ) {
                                    //     errors.username = 'Invalid username address';
                                    // }
                                    return errors;
                                }}
                                onSubmit={async (values, { setSubmitting }) => {
                                    setSubmitting(true);
                                    const response = await loginUser(values); 
                                    //   debugger;
                                    if(response)
                                    {
                                     
                                        console.log("API Login Response: " + JSON.stringify(response))
                                        localStorage.setItem('user', JSON.stringify(response));
                                        localStorage.setItem('token', 'testToken');
                                        localStorage.setItem('refresh-token', 'testRefreshToken');
                                        history.push('/report');
                                    }
                       
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="group">
                                            <label for="username" className="label">نام کاربری</label>
                                            <Field type="text" name="username" className="input" />
                                            <ErrorMessage name="username" component="div" />
                                        </div>
                                        <div className="group">
                                            <label for="pass" className="label">رمز عبور</label>
                                            <Field type="password" name="password" className="input" />
                                            <ErrorMessage name="password" component="div" />
                                        </div>
                                        <div className="group">
                                        <DormTypeCombo changeItem={setDormType} className="input" />
                                        </div>
                                       <br></br>
                                        <div className="group">
                                            <button type="submit" className="button" disabled={isSubmitting ? 'disabled' : ''} >
                                                ورود
                                            </button>
                                            {isSubmitting ? <Loading /> : null}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="hr"></div>
                            <div className=" text-center" style={{fontSize:"3vw"}}>
                                تمامی حقوق مادی و معنوی  متعلق به شرکت پدیده عصر فناوری می باشد.
                            </div>
                            <br/>
                            <div className=" text-center" style={{fontSize:"3vw"}} > Developed By:
                            <a className=" stretched-link" href={`https://t.me/hrt93`}  > HRT93</a>
                           
                            </div>
                        </div>
                        <div className="for-pwd-htm">
                            <div className="group">
                                <label for="user" className="label">نام کاربری یا ایمیل</label>
                                <input id="user" type="text" />
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
