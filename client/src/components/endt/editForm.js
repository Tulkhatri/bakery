import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
const usersSchema = Yup.object().shape({
});
const EditForm = (props) => {
  return (
    <>
      <div className='login_parent'>
                <div className='welcome'>{props.isAdminEdit ? `Edit ${props.items.name}`: 'Add Products'}</div>
                <Formik
                    initialValues={props.isAdminEdit ? props.items :{}}
                    validationSchema={usersSchema}
                    onSubmit={async (values, { resetForm }) => {//reset form is a inbuild function
                       props.postRequest(values);
                       
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className='form'>
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