import { useState } from 'react'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Modal } from 'antd';
import EditForm from '../endt/editForm';
import CustomForm from '../form/customForm';
import { Link } from 'react-router-dom';
const Card = (props) => {

    const postRequest = async (values) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        };
        try {
            const response = await fetch('http://localhost:3005/products', requestOptions)
            const data = await response.json()

            if (response.status === 409 && data.error) {
                alert(data.error)
            } else if (response.status === 200) {
                alert(data.msg)
                props.fetchProducts();
                // navigate('/');
            }
            // resetForm({ values: '' }); for blank form
        } catch (err) {
            alert(err);
        }
    }


    const [inputFields, setInputFields] = useState([])
    const [addButton, setAddButton] = useState([])
    const addProduct = () => {
        setInputFields(['name', 'price', 'image'])
        setAddButton(<button type='submit' className='button_submit'>Update Product</button>)
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
        addProduct()
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const deleteProduct = async () => {
        //fetch
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: props.items._id }),
        };
        try {
            const response = await fetch('http://localhost:3005/products', requestOptions)
            const data = await response.json()
            if (response.status === 200) {
                props.fetchProducts();
            }
            if (response.status === 409 && data.error) {
                alert(data.error)
            } else if (response.status === 200) {
                alert(data.msg)
                // navigate('/');
            }
            // resetForm({ values: '' }); for blank form
        } catch (err) {
            alert(err);
        }

    }

    return (
        <>
            <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                {props.email === 'tulkhatri01@gmail.com' ? <EditForm isAdminEdit={true} items={props.items} inputFields={inputFields} addButton={addButton} addProduct={addProduct} postRequest={postRequest} /> : <CustomForm inputFields={inputFields} />}
            </Modal>
             <div className="card_view" >
                <div className="card_image">{props.items.image}</div>
                <div className="card_name">{props.items.name}</div>
                <div className="card_price">{props.items.price}</div>
                <div className='action_button'>
                    {props.email === 'tulkhatri01@gmail.com' ? <div onClick={() => showModal(true)}>
                        <FontAwesomeIcon icon={faEdit} className='edit_delete_icon' />
                    </div> : ''}
                    {props.email === 'tulkhatri01@gmail.com' ? <div onClick={() => deleteProduct()}>
                        <FontAwesomeIcon icon={faTrash} className='edit_delete_icon' />
                    </div> : ''}
                </div>
            </div>
        </>
    );
}
export default Card;