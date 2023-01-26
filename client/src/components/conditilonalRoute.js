import { Routes, Route } from 'react-router-dom';
import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import ForgetPassword from '../containers/auth/ForgetPassword';
import UserDashboard from '../containers/users/userDashboard';
import AdminDashboard from '../containers/admin/adminDashboard';
import { useSelector } from 'react-redux';
import Products from '../containers/sharedScreens/products';
import NavBar from '../components/header/navBar/navBar';
import Profile from '../containers/sharedScreens/profile';
import PageNotFound from '../containers/auth/pageNotFound';
import ProductDetails from '../containers/sharedScreens/productDetails';
import PaymentOptions from '../containers/sharedScreens/paymentOptions';
function ConditionalRoute() {
  const { email, token } = useSelector(state => state.user)
  if (email === 'tulkhatri01@gmail.com' && token) {
    return <><NavBar /><AdminScreens /></>
  } else if (email !== '' && token) {
    return <><NavBar /><UserScreens /></>
  } else if (email === ''||email !== '') {
    return <><ProductScreen/></>
  }
  return <AuthScreens />

}
const AuthScreens = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forget_password' element={<ForgetPassword />} />
      <Route path='*' element={<PageNotFound />} />
      <Route exact path='/payment' element={<PaymentOptions />} />
    </Routes>
  );
}


const UserScreens = () => {
  return (
    <Routes>
      <Route exact path='/' element={<UserDashboard />} />
      <Route exact path='/profile' element={<Profile />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

const AdminScreens = () => {
  return (
    <Routes>
      <Route exact path='/' element={<AdminDashboard />} />
      <Route exact path='/products' element={<Products />} />
      <Route exact path='/profile' element={<Profile />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}
const ProductScreen = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Products />} />
      <Route exact path='/login' element={<Login />} />
      <Route exact path='/productDetails' element={<ProductDetails />} />
      <Route exact path='/profile' element={<Profile />} />
      <Route exact path='/payment' element={<PaymentOptions />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}
export default ConditionalRoute;

