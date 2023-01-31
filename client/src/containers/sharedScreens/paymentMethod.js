import axios from "axios";
import { Link,useLocation } from "react-router-dom";

const PaymentMethod=()=>{
    const { state } = useLocation();
    const orderProducts={
      name:state.name,
      price:state.price,
      image:state.image
    }
    const conformPayment = async (values) => {
        values=orderProducts
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            };
            try {
              const response = await fetch('http://localhost:3005/orderProducts', requestOptions)
              const data = await response.json()
              
              if (response.status === 409 && data.error) {
                alert(data.error)
              } else if (response.status === 200) {
                alert(data.msg)
                // navigate('/');
              }
              // resetForm({ values: '' }); for blank form
            } catch (err) {
              alert(err);
            }
          

    }
    return(
        <>
        <h1> Payment</h1>
       <Link to='/eSewa'> <button >eSewa</button></Link>
       <Link to='/orderProducts'> <button onClick={()=>conformPayment()}>Cash On Delivery</button></Link>
       {/* <div>{state.name}</div> */}
       <div>{state.name}</div>
        </>
    );
}
export default PaymentMethod;
