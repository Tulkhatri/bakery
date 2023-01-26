import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../../components/content/card';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
const Products = () => {
    const { email } = useSelector(state => state.user)
    const [validItems, setValidItems] = useState([])
    const fetchProducts = () => {
        axios.get("http://localhost:3005/products").then((res) => {
            setValidItems(res.data.products)
        })
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <div className='admin_drawer'>
                <Link to='/'> <FontAwesomeIcon icon={faBars} className="admin_icon"></FontAwesomeIcon> </Link>
            </div>
            <div className="card_main_div">
                {validItems.map((items) => {
                    return <Card items={items} email={email} fetchProducts={fetchProducts} />
                }

                )}
            </div>
        </>
    );
}
export default Products;