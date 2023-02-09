import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { message } from 'antd';
const usersSchema = Yup.object().shape({
});
const EditForm = (props) => {
    const [file, setFile] = useState(null);
    return (
        <>
            <div className='login_parent'>
                <div className='welcome'>{props.isAdminEdit ? `Edit ${props.items.name}` : 'Add Products'}</div>
                <Formik
                    initialValues={props.isAdminEdit ? props.items : {}}
                    validationSchema={usersSchema}
                    onSubmit={async (values, { resetForm }) => {//reset form is a inbuild function
                        const formData = new FormData()
                        formData.append('name', values.name)
                        formData.append('price', values.price)
                        formData.append('image', values.image)
                        formData.append('photo', file)
                        const requestOptions = {
                            method: 'POST',
                            body: formData,

                        };
                        try {
                            const response = await fetch('http://localhost:3005/products', requestOptions)
                            const data = await response.json()

                            if (response.status === 409 && data.error) {
                                message.error(data.error, [2])
                            } else if (response.status === 200) {
                                message.success(data.msg, [1])
                                // navigate('/');
                            }
                            // resetForm({ values: '' }); for blank form
                        } catch (err) {
                            message.error(err, [2])
                        }
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className='form' encType="multipart/form-data">
                            {props.inputFields.map((items) => {
                                return (
                                    <>
                                        <Field name={items} type='text' placeholder={items} />
                                        {errors[items] && touched[items] ? (
                                            <div>{errors[items]}</div>
                                        ) : null}
                                    </>
                                );
                            })
                            }

                            <div>
                                {/* <FontAwesomeIcon icon={faEdit} className='edit_profile' /> */}
                                <input type='file' onChange={(e) => setFile(e.target.files[0])} className=''></input>
                            </div>

                            {/* <Field name="photo">
                                {({
                                    field, // { name, value, onChange, onBlur }
                                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                    meta,
                                }) => (
                                    <div>
                                        <input type='file' onChange={(e) => Formik(e.currentTarget.files[0])} {...field} />
                                        {meta.touched && meta.error && (
                                            <div className="error">{meta.error}</div>
                                        )}
                                    </div>
                                )}
                            </Field> */}
                            {props.addButton}
                        </Form>
                    )}
                </Formik>
                <div className='end'>Best online shop</div>
            </div>
        </>
    );
};
export default EditForm;