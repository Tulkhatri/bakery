import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../components/content/card';
import '../../App.css'
import axios from "axios";
const FavoriteProducts = () => {
    const { email, _id } = useSelector(state => state.user)
    const [validItems, setValidItems] = useState([])
    const fetchProducts = (page, size) => {

        axios.get(`http://localhost:3005/fevorateProducts?userId=${_id}`).then((res) => {//page xa vane page xina vane 1 vaneko first page
            setValidItems(res.data.fevorateProducts)
        })
    }
   
    useEffect(() => {
        fetchProducts()
    }, [])
    console.log(validItems)
    return (
        <>
            <div>Favorite Products</div>
            <div className='admin_drawer'>
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
export default FavoriteProducts;