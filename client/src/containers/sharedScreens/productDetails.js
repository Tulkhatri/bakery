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
        <div className="Pdetail">
            <div className="product_page">
                <div className="product_page_image">
                {state.photo && <img src={require(`../../uploads/product/${state.photo}`)} alt='Loading'/>}
                   
                </div>
                <div className="product_page_data">
                    <div className="product_details_name">{state.name}</div>
                    <div className="product_details_price">Rs. {state.price}</div>
                </div>
                <div className="product_page_delivery">Delivery option</div>
            </div>
            

            {/* <Link to={(email !== '' && token) ? '/payment' : '/login'}> <button className="button_submit" >Buy Now</button></Link> */}
            {/* <Link to={(email !== '' && token) ? '/payment' : '/login'}>  */}
            <div className="button_submit_buynow">
            <button className="button_submit" onClick={()=>payment()}>Buy Now</button>
            </div>
            {/* </Link> */}
            </div>
        </>
    );
}
export default ProductDetails;
