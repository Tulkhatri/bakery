import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import ForgetPassword from './containers/auth/ForgetPassword';
function App() {
  return (
    <Routes>
    <Route path="/" element={ <Login/> } />
    <Route path="/register" element={ <Register/> } />
    <Route path="/forget_password" element={ <ForgetPassword/> } />
  </Routes>
  );
}

export default App;
