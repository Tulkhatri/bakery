import './../../App.css'
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const OrderProducts = () => {
    const { name, _id, email } = useSelector(state => state.user);
    const [orderProduct, setOrderProducts] = useState([])
    const [orderProductId, setOrderProductsId] = useState({})
    const fetchOrderProducts = () => {
        const apiReqAdmin = `http://localhost:3005/orderProducts`
        const apiReqUser = `http://localhost:3005/orderProducts?userId=${_id}`
        axios.get(email === 'tulkhatri01@gmail.com' ? apiReqAdmin : apiReqUser).then((res) => {
            setOrderProducts(res.data.orderProducts)
                
        })
    }
    const changeStatus=(status,productId)=>{
        alert(status+"  "+productId)
        const statusDetails={
            status,
            id:productId,
        }
        axios.patch(`http://localhost:3005/orderProducts/status`,statusDetails)
        
    }
    useEffect(() => {
        fetchOrderProducts()
    }, [])

    return (
        <>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>

                </tr>



                {orderProduct.map((items) => {
                    return (
                        <>
                            <tr>
                                <td>{items.name}</td>
                                <td>{items.price}</td>
                                <td>{items.orderStatus}</td>
                                <td>
                                    <button onClick={()=>changeStatus("Accept",(items._id))}>Accept</button>
                                    <button onClick={()=>changeStatus("Reject",items._id)}>Reject</button>
                                </td>
                            </tr>
                        </>
                    );
                })}

            </table>
        </>
    );
}
export default OrderProducts