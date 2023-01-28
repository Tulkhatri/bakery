import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
const ProductDetails = () => {
    const { email, token } = useSelector(state => state.user)
    return (
        <>
            <h1> Welcome ProductDetails Page</h1>
            <Link to={(email !== '' && token) ? '/payment' : '/login'}> <button >Checkout</button></Link>
        </>
    );
}
export default ProductDetails;
