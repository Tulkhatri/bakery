import '../../App.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../components/content/card';
import { Pagination } from 'antd';
import axios from "axios";
import FavoriteCard from '../sharedScreens/favoriteCard';
const Products = () => {
    const { _id, email } = useSelector(state => state.user)
    const [validItems, setValidItems] = useState([])
    const [productCount, setProductCount] = useState(0)
    const fetchProducts = (page, size) => {

        axios.get(`http://localhost:3005/products/?page=${page || 1}&size=${size || 10}`).then((res) => {//page xa vane page xina vane 1 vaneko first page
            setValidItems(res.data.products)
            setProductCount(res.data.totalProudctCount)
        })
    }
    const [favoriteItems, setFavoriteItems] = useState([])
    const [favoriteCount, setfavoriteCount] = useState(0)
    const fetchFavorite = () => {
        axios.get(`http://localhost:3005/favoriteProducts?userId=${_id}`).then((res) => {//page xa vane page xina vane 1 vaneko first page
            try {
                setFavoriteItems(res.data.favoriteProducts)
                setfavoriteCount(res.data.totalFavoriteProducts)
            } catch (err) {
            }
        })
    }
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <>
            <FavoriteCard fetchFavorite={fetchFavorite} favoriteItems={favoriteItems} favoriteCount={favoriteCount} />
            <div className='admin_drawer'>
            </div>
            <div className="card_main_div">
                {validItems.map((items) => {
                    return <Card items={items} email={email} fetchProducts={fetchProducts} fetchFavorite={fetchFavorite} />
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