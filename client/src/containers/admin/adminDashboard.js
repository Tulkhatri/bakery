import React, { useState } from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavBar from '../../components/header/navBar/navBar'
import CustomForm from '../../components/form/customForm';

function AdminDashboard() {


  const postRequest = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    };
    try {
      const response = await fetch('http://localhost:3005/products', requestOptions)
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

  const [inputFields, setInputFields] = useState([])
  const [addButton, setAddButton] = useState([])

  const addProduct = () => {
    setInputFields(['name', 'price', 'image'])
    setAddButton(<button type='submit' className='button_submit'>Submit</button>)
  }
  const viewOrderRequest = () => {


  }
  return (
    <div>
      <NavBar />

      <div className='admin_drawer'>
        <FontAwesomeIcon icon={faBars} className="admin_icon"></FontAwesomeIcon>
        <div>
          <div className='admin_task'>
            <div>Welcome! to Admin Pannel</div>
            <div>
              <button onClick={addProduct}>Add Product</button>
            </div>
            <button onClick={(viewOrderRequest)}>Order Request</button>
          </div>
        </div>
      </div>

      <CustomForm inputFields={inputFields} addButton={addButton} postRequest={postRequest} />

    </div>
  );
}
export default AdminDashboard;
