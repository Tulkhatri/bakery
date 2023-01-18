import React, { useEffect, useState } from 'react'
import NavBar from '../../components/header/navBar/navBar'
import axios from "axios";
import Card from '../../components/content/card';
const UserDashboard = () => {
  const [validItems, setValidItems] = useState([])
  const fetchProducts = () => {
    axios.get("http://localhost:3005/products").then((res) => {
      setValidItems(res.data.products)
    })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <NavBar />
      <h1>User Dashboard</h1>
      <div className="card_main_div">
      {validItems.map((items) => {
        return <Card items={items} />
      }

      )}
      </div>
      

    </>
  );
}

export default UserDashboard;
