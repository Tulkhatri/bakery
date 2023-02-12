import '../../App.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../components/content/card';
import { Pagination } from 'antd';
import axios from "axios";
import FavoriteCard from '../sharedScreens/favoriteCard';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Products = () => {
    const [query, setQuery] = useState("")
    console.log(query)
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
                <div className='search'>
                    <input type="search" className='search_box' placeholder='Search'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faSearch} className='search_icon' />
                </div>
                {validItems.filter(items => items.name.toLowerCase().includes(query.toLowerCase())
                ).map((items) => (
                    <Card items={items} email={email} fetchProducts={fetchProducts} fetchFavorite={fetchFavorite} />
                ))}
            </div>
            <div className='pagination'>
                <Pagination total={productCount} onChange={(page, size) => fetchProducts(page, size)} />
            </div>
        </>
    );
}
export default Products;