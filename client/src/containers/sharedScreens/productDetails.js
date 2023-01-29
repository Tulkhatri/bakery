import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
const ProductDetails = () => {
    const { email, token } = useSelector(state => state.user)
    const { state } = useLocation();
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


            <Link to={(email !== '' && token) ? '/payment' : '/login'}> <button className="button_submit" >Buy Now</button></Link>
        </>
    );
}
export default ProductDetails;
