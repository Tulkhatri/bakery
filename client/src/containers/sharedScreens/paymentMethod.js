import { Link } from "react-router-dom";
const PaymentMethod=()=>{
    return(
        <>
        <h1> Payment</h1>
       <Link to='/eSewa'> <button >eSewa</button></Link>
       <Link to='/banking'> <button >Mobile Banking</button></Link>
        </>
    );
}
export default PaymentMethod;
