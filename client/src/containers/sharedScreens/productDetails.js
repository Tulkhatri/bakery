import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faMinus, faPlus, faRedo, faCartShopping, faMapMarker, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message } from 'antd';
import '../../App.css'
import { useEffect, useState } from "react";
import axios from "axios";
const ProductDetails = () => {
    const { _id } = useSelector(state => state.user);
    const [cartCount, setcartCount] = useState(1)
    const { email, token } = useSelector(state => state.user)
    const [totalNavCartCount, setTotalNavCartCount] = useState(0)
    const { state } = useLocation();
    const navigate = useNavigate();
    const payment = () => {
        state.price = totalPrice
        state.quantity=cartCount
        navigate((email !== '' && token) ? '/payment' : '/login', { state: state })
    }
    const addToCart = async (values) => {
        navigate((email !== '' && token) ? '/cart' : '/login', { state: state })
        // state.price = totalPrice
        console.log("Hellooooo" + state.items)
        const cart = {
            products: state._id || state.products._id,
            quantity: cartCount,
            totalPrice: cartCount * state.price || cartCount * state.products.price,
        }
        values = cart
        values.userId = _id
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        };
        try {
            const response = await fetch('http://localhost:3005/cart', requestOptions)
            const data = await response.json()
            if (response.status === 409 && data.error) {
                message.error(data.error, [2])
            } else if (response.status === 200) {
                message.success(data.msg, [1])
            }
        } catch (err) {
            message.error(err, [2])
        }
    }
    const totalPrice = state.price * cartCount || state.products.price * cartCount
    const counter = () => {
        setcartCount(cartCount + 1)
    }
    const counterM = () => {
        if (cartCount > 1) {

            setcartCount(cartCount - 1)
        }
    }
    const counterR = () => {
        setcartCount(1)
    }
    const navCartCount = () => {
        axios.get(`http://localhost:3005/cart?userId=${_id}`).then((res) => {//page xa vane page xina vane 1 vaneko first page
            setTotalNavCartCount(res.data.totalCart)
        })
    }
    useEffect(() => {
        navCartCount()
    }, [])

    return (
        <>
            <FontAwesomeIcon icon={email && faCartShopping} className="navCart" />
            {email && <div className={"navCart_count"}><div>{totalNavCartCount}</div></div>}
            <div className="Pdetail">
                <div className="product_page">
                    <div className="product_page_image">
                        {state.photo ? <img src={require(`../../uploads/product/${state.photo}`)} alt='Loading' />
                            : <img src={require(`../../uploads/product/${state.products.photo}`)} alt='Loading' />}
                    </div>
                    <div className="product_page_data">
                        <div className="product_details_name">{state.name || state.products.name}</div>
                        <div className="product_details_name">Rs. {totalPrice}</div>
                        <div className="counter">
                            <div className="counter_value">{cartCount}</div>
                            <div className="increment_decrement">
                                <div className="data_action" onClick={counterM}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </div>
                                <div className="data_redo">
                                    <FontAwesomeIcon icon={faRedo} onClick={counterR} />
                                </div>
                                <div className="data_action" onClick={counter}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product_page_delivery">
                        <div>Delivery</div>
                        <div className="delivery_loaction">
                            <FontAwesomeIcon icon={faMapMarker} className="faMapMarker" />
                            <div>Your Location ?</div>
                            <button className="location_change">Change</button>
                        </div>
                        <div className="cash_on_delivery">
                            <FontAwesomeIcon icon={faMoneyCheckDollar} className="faMapMarker" />
                            <div>Cash on Delivery Available</div>
                        </div>
                    </div>
                </div>

                {/* <Link to={(email !== '' && token) ? '/payment' : '/login'}> <button className="button_submit" >Buy Now</button></Link> */}
                {/* <Link to={(email !== '' && token) ? '/payment' : '/login'}>  */}
                <div className="button_submit_buynow">
                    <button className="button_submit" onClick={() => payment()}>Buy Now</button>
                    <button className="button_submit" onClick={() => addToCart()}>
                        <FontAwesomeIcon icon={faCartShopping} onClick={counterR} />  Add to cart
                    </button>
                </div>
                {/* </Link> */}
            </div>
        </>
    );
}
export default ProductDetails;
