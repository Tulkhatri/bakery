import React, { useState } from 'react'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomForm from '../../components/form/customForm';
import { Link } from 'react-router-dom'
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
  return (
    <>

      <div className='admin_drawer'>
        <FontAwesomeIcon icon={faBars} className="admin_icon"></FontAwesomeIcon>
        <div>
          <div className='admin_task'>
            <div>Welcome! to Admin Pannel</div>
            <div>
              <button onClick={addProduct}>Add Product</button>
            </div>
            <Link to='/products'>  <button>View Products</button></Link>
          </div>
        </div>
      </div>
      <CustomForm inputFields={inputFields} addButton={addButton} postRequest={postRequest} />
    </>
  );
}
export default AdminDashboard;
