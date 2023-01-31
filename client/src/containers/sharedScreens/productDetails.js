import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ProductDetails = () => {
    const { email, token } = useSelector(state => state.user)
    const { state } = useLocation();
    const navigate = useNavigate();
    const payment=()=>{
        navigate((email !== '' && token) ?'/payment': '/login',{state:state})
    }
    return (
        <>
            <div className="product_page">
                <div className="product_page_image">{state.image}</div>
                <div className="product_page_data">
                    <div className="product_details_name">{state.name}</div>
                    <div className="product_details_price">Rs. {state.price}</div>
                </div>
                <div className="product_page_delivery">Delovery option</div>
            </div>


            {/* <Link to={(email !== '' && token) ? '/payment' : '/login'}> <button className="button_submit" >Buy Now</button></Link> */}
            {/* <Link to={(email !== '' && token) ? '/payment' : '/login'}>  */}
            <button className="button_submit" onClick={()=>payment()}>Buy Now</button>
            {/* </Link> */}
        </>
    );
}
export default ProductDetails;
