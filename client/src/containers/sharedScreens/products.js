import '../../App.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../components/content/card';
import { Pagination } from 'antd';
import axios from "axios";
import FavoriteCard from '../sharedScreens/favoriteCard';
const Products = () => {
    const { email } = useSelector(state => state.user)
    const [validItems, setValidItems] = useState([])
    const [productCount, setProductCount] = useState(0)
    const fetchProducts = (page, size) => {

        axios.get(`http://localhost:3005/products/?page=${page || 1}&size=${size || 10}`).then((res) => {//page xa vane page xina vane 1 vaneko first page
            setValidItems(res.data.products)
            setProductCount(res.data.totalProudctCount)
        })
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
            <FavoriteCard />
            <div className='admin_drawer'>
            </div>
            <div className="card_main_div">
                {validItems.map((items) => {
                    return <Card items={items} email={email} fetchProducts={fetchProducts} />
                }

                )}
            </div>
            <div className='pagination'>
                <Pagination total={productCount} onChange={(page, size) => fetchProducts(page, size)} />
                {console.log(productCount)}
            </div>

        </>
    );
}
export default Products;