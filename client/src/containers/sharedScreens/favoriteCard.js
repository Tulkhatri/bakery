import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useSelector } from 'react-redux'
import { faHeart, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
const FavoriteCard = (props) => {
    const navigate=useNavigate();
    const { _id } = useSelector(state => state.user)
    const [validItems, setValidItems] = useState([])
    const fetchProducts = (page, size) => {

        axios.get(`http://localhost:3005/fevorateProducts?userId=${_id}`).then((res) => {//page xa vane page xina vane 1 vaneko first page
            setValidItems(res.data.fevorateProducts)
            
        })
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    const [fevorateDisplay, setfevorateDisplay] = useState("block")
    const coloseFevorate = () => {
        setfevorateDisplay("none")
        console.log(fevorateDisplay)

    }
    return (
        <>
            <div  className='fevorateCard' style={{ display: fevorateDisplay }}>
                <div className='fevorateCard_title'>

                    <div >Favorite Items </div>
                    <div onClick={() => coloseFevorate()} className='fevorateCard_close'><FontAwesomeIcon icon={faClose} /></div>
                </div>
                {validItems.map(items => <div onClick={() => navigate("/fevorateProducts")} className='fevorateCard_data' >
                    <FontAwesomeIcon icon={faHeart} id="favorate_icon_Redcolor" />
                    {" " + items.name}
                </div>)}
            </div>
        </>
    );
}
export default FavoriteCard;