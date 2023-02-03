import axios from "axios";
import './../../App.css'
import { useEffect, useState } from "react";

const OrderProducts=()=>{

    const [orderProduct, setOrderProducts] = useState([])
    const fetchOrderProducts = () => {
        axios.get("http://localhost:3005/orderProducts").then((res) => {
            setOrderProducts(res.data.orderProducts)
           
        })
    }
    useEffect(() => {
        fetchOrderProducts()
    }, [])

    return(
        <>
        <table>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
                
            </tr>
            
                
           
        {orderProduct.map((items)=>{
            return(
                <>
                <tr>
                <td>{items.name}</td>
                <td>{items.price}</td>
                <td>{items.image}</td>
                </tr>
                </>
            );
        })}
        
        </table>
        </>
    );
}
export default OrderProducts