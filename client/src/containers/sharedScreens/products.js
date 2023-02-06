import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../../components/content/card';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../App.css'
import { Pagination } from 'antd';
import axios from "axios";
const Products = () => {
    const { email } = useSelector(state => state.user)
    const [validItems, setValidItems] = useState([])
    const [productCount, setProductCount] = useState(0)
    const fetchProducts = (page,size) => {

        axios.get(`http://localhost:3005/products/?page=${page || 1}&size=${size||10}`).then((res) => {//page xa vane page xina vane 1 vaneko first page
            setValidItems(res.data.products)
            setProductCount(res.data.totalProudctCount)
        })
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <div className='admin_drawer'>
                {/* <Link to='/'> <FontAwesomeIcon icon={faBars} className="admin_icon"></FontAwesomeIcon> </Link> */}
            </div>
            <div className="card_main_div">
                {validItems.map((items) => {
                    return <Card items={items} email={email} fetchProducts={fetchProducts} />
                }

                )}
            </div>
            <div className='pagination'>
            <Pagination total={productCount} onChange={(page,size)=>fetchProducts(page,size)}/>
            {console.log(productCount)}
            </div>
        </>
    );
}
export default Products;