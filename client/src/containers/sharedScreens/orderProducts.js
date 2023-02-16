import '../../App.css'
import axios from "axios";
import { Button, Modal } from 'antd';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const OrderProducts = () => {
    const [query, setQuery] = useState("")
    const { _id, name, email, phoneNumber, address } = useSelector(state => state.user);
    const [orderProduct, setOrderProducts] = useState([])
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
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
         axios.get(`http://localhost:3005/user/${_id}`).then((res) => {
            // setUserDetails(res.data.userDetails)

        })
        setOpen(true);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Modal
                open={open}
                title="User Details"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    // <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                    //     Submit
                    // </Button>,
                ]}
            >
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <p>Phone Number: {phoneNumber}</p>
                <p>Address: {address}</p>
            </Modal>
            <div className='orderProductPage'>
                <div className='search'>
                    <input type="search" className='search_box' placeholder='Search'
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <FontAwesomeIcon icon={faSearch} className='search_icon' />
                </div>
                <table>
                    <tr>
                        {email === 'tulkhatri01@gmail.com' && <th>Order Id</th>}
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        {email === 'tulkhatri01@gmail.com' && <th>Action</th>}

                    </tr>
                    {orderProduct.map((items) => {
                        return (
                            <>
                                <tr>
                                    {email === 'tulkhatri01@gmail.com' && <span className='userId_table'>
                                        <td onClick={showModal}>{items.userId}</td>
                                    </span>}
                                    <td>{items.name}</td>
                                    <td>{items.price}</td>
                                    <td>{items.orderStatus}</td>
                                    {email === 'tulkhatri01@gmail.com' && <td>
                                        <button onClick={() => changeStatus("Accept", (items._id))}>Accept</button>
                                        <button onClick={() => changeStatus("Reject", items._id)}>Reject</button>
                                    </td>}
                                </tr>
                            </>
                        );
                    })}

                </table>
            </div>
        </>
    );
}
export default OrderProducts