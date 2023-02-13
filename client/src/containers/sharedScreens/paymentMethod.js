import '../../App.css'
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from 'antd';
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
        message.error(data.error, [2])
      } else if (response.status === 200) {
        message.success(data.msg, [1])
      }
    } catch (err) {
      message.error(err, [2])
    }
  }
  return (
    <>
      <div className="pamentPage">
        <div className="pamentPage_name">{state.name}</div>
        <div className="pamentPage_name">Total Amount Rs. {state.price}</div>
        {/* <Link to='/eSewa'> <button >eSewa</button></Link> */}
        <div >
          <Link to='/orderProducts'> <button onClick={() => conformPayment()} className="button_submit_cash" >Cash On Delivery</button></Link>
        </div>

      </div>
    </>
  );
}
export default PaymentMethod;
