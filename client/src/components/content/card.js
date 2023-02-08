import { useState } from 'react'
import { faEdit, faTrash, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Modal } from 'antd';
import EditForm from '../endt/editForm';
import CustomForm from '../form/customForm';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
const Card = (props) => {
    const {email, _id } = useSelector(state => state.user);
    const navigate = useNavigate();
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
    const productDetails = () => {
        navigate(props.email === 'tulkhatri01@gmail.com' ? '' : '/productDetails', { state: props.items })
        console.log(props.items)
    }
    const fevorateProducts = {
        name: props.items.name,
        price: props.items.price,
        photo: props.items.photo,
        description: props.items.description,
    }
    const favoriteItems = async (values) => {

        values = fevorateProducts
        values.userId = _id
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        };
        try {
            const response = await fetch('http://localhost:3005/fevorateProducts', requestOptions)
            const data = await response.json()
            if (response.status === 409 && data.error) {
                alert(data.error)
            } else if (response.status === 200) {

                alert(data.msg)

            }
        } catch (err) {
            alert(err);
        }
    }

    const removeFevorate = async () => {
        console.log(props.items._id)
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: props.items._id }),
        };
        try {
            const response = await fetch(`http://localhost:3005/fevorateProducts?userId=${_id}`, requestOptions)
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
            <div>
                <FontAwesomeIcon icon={faHeart} className='favorite_icon' id={props.items.color && "favorate_icon_Redcolor"} onClick={() =>email? props.items.color ? removeFevorate() : favoriteItems():navigate("/login")} />
                <div className="card_view" onClick={() => productDetails()}>


                    <div className="card_image">
                        {props.items.photo && <img src={require(`../../uploads/product/${props.items.photo}`)} alt='Loading' />}
                    </div>
                    <div className='namePrice'>
                        <div className="card_name">{props.items.name}</div>
                        <div className="card_price">{"Rs. " + props.items.price}</div>
                    </div>
                    <div className='action_button'>
                        {props.email === 'tulkhatri01@gmail.com' ? <div onClick={() => showModal(true)}>
                            <FontAwesomeIcon icon={faEdit} className='edit_delete_icon' />
                        </div> : ''}
                        {props.email === 'tulkhatri01@gmail.com' ? <div onClick={() => deleteProduct()}>
                            <FontAwesomeIcon icon={faTrash} className='edit_delete_icon' />
                        </div> : ''}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Card;