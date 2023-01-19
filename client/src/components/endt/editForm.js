import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {Modal } from 'antd';
import { useState } from 'react';
const usersSchema = Yup.object().shape({
});
const EditForm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    props.addProduct()
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={showModal}>
        Add Product
      </button>
      <Modal title="  " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={null}>
      <div className='login_parent'>
            {/* <div className='container_login'> */}
                <div className='welcome'>Add Products</div>
                <Formik
                    initialValues={{}}
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
            {/* </div> */}
        </div>
      </Modal>
    </>
  );
};
export default EditForm;