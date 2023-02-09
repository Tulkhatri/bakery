import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux'
import { faHeart, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const FavoriteCard = () => {
    const navigate = useNavigate();
    const { _id,email } = useSelector(state => state.user)
    const [validItems, setValidItems] = useState([])
    const [favoriteCount, setfavoriteCount] = useState(0)
    const fetchProducts = () => {

        axios.get(`http://localhost:3005/favoriteProducts?userId=${_id}`).then((res) => {//page xa vane page xina vane 1 vaneko first page
            try {
                setValidItems(res.data.favoriteProducts)
                setfavoriteCount(res.data.totalFavoriteProducts)
            } catch (err) {

            }

        })
    }

    useEffect(() => {
        email && fetchProducts()
    }, [])
    const [favoriteDisplay, setfavoriteDisplay] = useState(email? "block":"none")
    const coloseFavorite = () => {
        setfavoriteDisplay("none")
    }
    return (
        <>
            <div className='fevorateCard' style={{ display: favoriteDisplay }}>
                <div className='fevorateCard_title'>

                    <div >Favorite Items {favoriteCount}</div>
                    <div onClick={() => coloseFavorite()} className='fevorateCard_close'><FontAwesomeIcon icon={faClose} /></div>
                </div>
                {validItems.map(items => <div onClick={() => navigate("/favoriteProducts")} className='fevorateCard_data' >
                    <FontAwesomeIcon icon={faHeart} id="favorate_icon_Redcolor" />
                    {" " + items.name}
                </div>)}
            </div>
        </>
    );
}
export default FavoriteCard;