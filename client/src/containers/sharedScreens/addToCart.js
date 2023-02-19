import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../App.css'
import axios from "axios";
import { faClose, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CartCard from '../../components/content/cartCard';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
const AddToCart = () => {
  const navigate = useNavigate();
  const [totalNavCartCount, setTotalNavCartCount] = useState(0)
  const { email, _id } = useSelector(state => state.user)
  const [validItems, setValidItems] = useState([])
  const fetchProducts = (page, size) => {

    axios.get(`http://localhost:3005/cart?userId=${_id}`).then((res) => {//page xa vane page xina vane 1 vaneko first page
      setValidItems(res.data.cart)
      setTotalNavCartCount(res.data.totalCart)
    })
  }
  const name = []
  const quantity = []
  const rate = []
  const totalPrice = []
  validItems.map((items) => {

    name.push(items.name)
    quantity.push(items.quantity)
    rate.push(items.price)
    totalPrice.push(items.totalPrice)
  })

  const orderProducts = {
    name: name,
    quqntity: quantity,
    rate: rate,
    totalPrice: totalPrice,
  }

  const cartBuy = async (values) => {
    values = orderProducts
    values.userId = _id
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch('http://localhost:3005/cartOrderProducts', requestOptions)
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
  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <FontAwesomeIcon icon={email && faCartShopping} className="navCart" />
      <div className={email && "navCart_count"}><div>{totalNavCartCount}</div></div>
      <div className='admin_drawer'>
      </div>
      {validItems.map((items) => {
        return <CartCard items={items} email={email} fetchProducts={fetchProducts} faClose={<FontAwesomeIcon icon={faClose} className="cart_close" />} />
      }
      )}
      {totalNavCartCount > 1 && <div className="grand_total" >Grand Total Rs. {totalNavCartCount > 1 ? validItems[0].totalPrice : ""}</div>}
      <div className="button_submit_buynow">
        <button className="button_submit" onClick={() => navigate("/")}>Continue Shopping</button>
        {totalNavCartCount > 0 && <button className="button_submit" onClick={() => cartBuy()} >Buy Now</button>}

      </div>
    </>
  );
}
export default AddToCart;