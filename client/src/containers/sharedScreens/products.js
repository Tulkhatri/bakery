import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/content/card';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { Modal } from 'antd';
const Products = (props) => {
    const [validItems, setValidItems] = useState([])
    const fetchProducts = () => {
        axios.get("http://localhost:3005/products").then((res) => {
            setValidItems(res.data.products)
        })
    }

    useEffect(() => {
        fetchProducts()
    }, [])
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
            <div className='admin_drawer'>
                <Link to='/'> <FontAwesomeIcon icon={faBars} className="admin_icon"></FontAwesomeIcon> </Link>
            </div>
            <Modal title="  " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={null}> </Modal>
            <div className="card_main_div"onClick={(()=> setIsModalOpen(true))}>
                {validItems.map((items) => {
                    return <Card items={items} />
                }
                
                )}
            </div>
               
        </>
    );

}
export default Products;