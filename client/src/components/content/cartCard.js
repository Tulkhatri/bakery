import '../../App.css'
import React from 'react'
import { useSelector } from "react-redux";
import { message } from 'antd';
const CartCard = (props) => {
    const { _id } = useSelector(state => state.user);
    const removeCart = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ _id: props.items._id }),
        };
        try {
            const response = await fetch(`http://localhost:3005/cart?userId=${_id}`, requestOptions)
            const data = await response.json()
            if (response.status === 200) {
                props.fetchProducts();
            }
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
            <div className='cart_card'>
                <div onClick={() => removeCart()}>{props.faClose}</div>
                <div className='cart_card_image'>
                    {props.items.photo && <img src={require(`../../uploads/product/${props.items.photo}`)} alt='Loading' />}
                </div>
                <div >
                    <div className='cart_card_heading'>Name</div>
                    <div className='cart_card_value'>{props.items.name}</div>
                </div>
                <div>
                    <div className='cart_card_heading'>Quantity</div>
                    <div className='cart_card_value'>{props.items.quantity}</div>
                </div>
                <div>
                    <div className='cart_card_heading'>Rate</div>
                    <div className='cart_card_value'>{"Rs. " + props.items.price}</div>
                </div>
                <div>
                    <div className='cart_card_heading'>Total Price</div>
                    <div className='cart_card_value'>{"Rs. " + (props.items.totalPrice)}</div>
                </div>
            </div>
        </>
    );
}
export default CartCard;