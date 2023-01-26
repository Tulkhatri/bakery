import { Link } from "react-router-dom";

const ProductDetails=()=>{
    return(
        <>
        <h1>Product Details</h1>
        <Link to='/login'><button className="button_submit">checkout</button></Link>
        </>
    );
}
export default ProductDetails