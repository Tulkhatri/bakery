import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { faMinus, faPlus, faRedo, faCartShopping, faMapMarker,faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { message } from 'antd';
import '../../App.css'
import { useState } from "react";
const ProductDetails = () => {
    const [cartCount, setcartCount] = useState(1)
    const { email, token } = useSelector(state => state.user)
    const { state } = useLocation();
    const navigate = useNavigate();
    const payment = () => {
        state.price = totalPrice
        navigate((email !== '' && token) ? '/payment' : '/login', { state: state })
    }
    const totalPrice = state.price * cartCount
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
    return (
        <>
            <div className="Pdetail">
                <div className="product_page">
                    <div className="product_page_image">
                        {state.photo && <img src={require(`../../uploads/product/${state.photo}`)} alt='Loading' />}

                    </div>
                    <div className="product_page_data">
                        <div className="product_details_name">{state.name}</div>
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
                    <button className="button_submit" onClick={() => message.success("Added items in your cart", [1])}>
                        <FontAwesomeIcon icon={faCartShopping} onClick={counterR} />  Add to cart 
                    </button>
                </div>
                {/* </Link> */}
            </div>
        </>
    );
}
export default ProductDetails;
