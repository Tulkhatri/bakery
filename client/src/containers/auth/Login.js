import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faCheck, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
const SignupSchema = Yup.object().shape({

    email: Yup.string()
        .email(<FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />)
        .required(<FontAwesomeIcon icon={faTriangleExclamation} className='register_icon_warning' />),


    password: Yup.string()
        // .required("Required field")
        .oneOf([Yup.ref('password'), null])
        .matches(/[a-z]/, "Atleast one small letter")
        .oneOf([Yup.ref('password'), null])
        .matches(/[A-Z]/, "Atleast one capital letter")
        .matches(/[0-9]/, 'Atleast  one number')
        .min(8, 'Should be 8 chars minimum.'),
});
const Login = () => {

    return (
        <div className='login_parent'>
            <div className='container_login'>
                <div className='welcome'>Welcome! Please Login to continue.</div>
                <Link to="/register" className='create'>New member? Register here.</Link>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className='form'>
                            <Field name="email" type="email" placeholder="Enter Email Address" />
                                {errors.email && touched.email ? <div>{errors.email}</div> : null}
                           <Field name="password" type="password" placeholder="Enter Password" />
                           <FontAwesomeIcon icon={faEyeSlash} className='icon_eye_slash' />
                                {errors.password && touched.password ? (
                                    <div>{errors.password}</div>
                                    ) : null} 
                            <Link to="/forget_password" className='forget_password'>Forget password</Link>
                            <button type="submit" className='button_login'>Login</button>
                        </Form>
                    )}
                </Formik>

                    <div className='end'>Best online shop</div>
                </div>
            </div>
    );
}
export default Login;