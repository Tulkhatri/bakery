import '../../App.css'
import React, { useEffect, useState } from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomForm from '../../components/form/customForm';
import { Link } from 'react-router-dom'
import EditForm from '../../components/endt/editForm';
import { Modal } from 'antd';
import axios from 'axios';
import Footer from '../../components/footer/footer';
import { useSelector } from 'react-redux';
function AdminDashboard() {
  const [inputFields, setInputFields] = useState([])
  const [addButton, setAddButton] = useState([])

  const addProduct = () => {
    setInputFields(['name', 'price', 'description'])
    setAddButton(<button type='submit' className='button_submit'>Add Product</button>)
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    addProduct()
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { _id } = useSelector(state => state.user)
  const [userDetails, setUserDetails] = useState([])
  const [userId, setUserId] = useState(_id)
  const [userName, setUsername] = useState("Live Bakery")
  const [messageOpen, setMessageOpen] = useState("none")
  const getAllUser = async () => {
    const res = await axios.get(`http://localhost:3005/user`)
    setUserDetails(res.data.userDetails)
  }
  const popupMessageDialog = (id, name) => {
    setMessageOpen("block")
    setUserId(id)
    setUsername(name)

  }
  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <>
      <div className='admin_drawer'>
        <FontAwesomeIcon icon={faBars} className="admin_icon"></FontAwesomeIcon>
        <div>
          <div className='admin_task'>
            <div>Welcome! to Admin Pannel</div>
            <div>
              <Modal title="  " open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <EditForm inputFields={inputFields} addButton={addButton} addProduct={addProduct} />
              </Modal>
              <button onClick={() => showModal(true)}>Add Product</button>
            </div>
            <Link to='/products'>  <button>View Products</button></Link>
            <Link to='/orderProducts'>  <button>Ordered Products</button></Link>
          </div>
        </div>
      </div>
      <div className="chat_user">
        {
          userDetails.map(items => {
            return (<>
              {items.email === "tulkhatri01@gmail.com" ? "" : <div className="chat_user_icon_name"onClick={() => popupMessageDialog(items._id, items.name)}>
                <div className="chat_user_icon" >
                  {items.avatar && <img src={require(`../../uploads/profile/${items.avatar}`)} className='profile_image' alt='Loading' />}
                </div>
                <div className="chat_user_name">{items.name}</div>
              </div>}
            </>);
          })
        }

      </div>
      <Footer messageOpen={messageOpen} getmessageFromId={userId} userName={userName} />

    </>
  );
}
export default AdminDashboard;
