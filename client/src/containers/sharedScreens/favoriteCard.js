import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { faHeart, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const FavoriteCard = (props) => {
    const navigate = useNavigate();
    const { email } = useSelector(state => state.user)
    useEffect(() => {
        email && props.fetchFavorite()
    }, [])
    const [favoriteDisplay, setfavoriteDisplay] = useState(email ? "block" : "none")
    const coloseFavorite = () => {
        setfavoriteDisplay("none")
    }
    return (
        <>
            <div className='fevorateCard' style={{ display: props.favoriteCount ? favoriteDisplay : "none" }}>
                <div className='fevorateCard_title'>
                    <div>Favorite Items {props.favoriteCount}</div>
                    <div onClick={() => coloseFavorite()} className='favoriteCard_close'><FontAwesomeIcon icon={faClose} /></div>
                </div>
                {props.favoriteItems.map(items => <div onClick={() => navigate("/favoriteProducts")} className='fevorateCard_data' >
                    <FontAwesomeIcon icon={faHeart} id="favorate_icon_Redcolor" />
                    {" " + items.products.name}
                </div>)}
            </div>
        </>
    );
}
export default FavoriteCard;