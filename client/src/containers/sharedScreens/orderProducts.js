import './../../App.css'
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const OrderProducts = () => {
    const [query, setQuery] = useState("")
    const { name, _id, email } = useSelector(state => state.user);
    const [orderProduct, setOrderProducts] = useState([])
    const [orderProductId, setOrderProductsId] = useState({})
    const fetchOrderProducts = () => {
        const apiReqAdmin = `http://localhost:3005/orderProducts?qSearch=${query}`
        const apiReqUser = `http://localhost:3005/orderProducts?userId=${_id}&qSearch=${query}`
        axios.get(email === 'tulkhatri01@gmail.com' ? apiReqAdmin : apiReqUser).then((res) => {
            setOrderProducts(res.data.orderProducts)

        })
    }
    const changeStatus = (status, productId) => {
        const statusDetails = {
            status,
            id: productId,
        }
        axios.patch(`http://localhost:3005/orderProducts/status`, statusDetails)

    }
    useEffect(() => {
        fetchOrderProducts()
    }, [query])
    // const keys=["name","price","orderStatus"]//for front end search 
    // const search = (orderProduct) => {
    //     return orderProduct.filter((items) =>
    //         // items.name.toLowerCase().includes(query.toLowerCase()) ||
    //         // items.price.toLowerCase().includes(query.toLowerCase())||
    //         // items.orderStatus.toLowerCase().includes(query.toLowerCase())
    //         keys.some((key)=>items[key].toLowerCase().includes(query.toLowerCase()))//by using array we can write code in single line
    //     )
    // }
    return (
        <>
            <div className='search'>
                <input type="search" className='search_box' placeholder='Search'
                    onChange={(e) => setQuery(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} className='search_icon' />
            </div>
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
                                    <button onClick={() => changeStatus("Accept", (items._id))}>Accept</button>
                                    <button onClick={() => changeStatus("Reject", items._id)}>Reject</button>
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