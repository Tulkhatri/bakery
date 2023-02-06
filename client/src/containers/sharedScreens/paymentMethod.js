import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const PaymentMethod = () => {
  const { _id } = useSelector(state => state.user);
  const { state } = useLocation();
  const orderProducts = {
    name: state.name,
    price: state.price,
    image: state.image,
  }
  const conformPayment = async (values) => {
    values = orderProducts
    values.userId = _id
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
      }
    } catch (err) {
      alert(err);
    }
  }
  return (
    <>
      <div className="contentCss">
        <h1> Payment</h1>
        <Link to='/eSewa'> <button >eSewa</button></Link>
        <Link to='/orderProducts'> <button onClick={() => conformPayment()}>Cash On Delivery</button></Link>
        <div>{state.name}</div>
      </div>
    </>
  );
}
export default PaymentMethod;
