
import './style.css'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { logoutResetDetails } from '../../../redux/actions/userAction'
import { useNavigate, Link } from 'react-router-dom';
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, email } = useSelector(state => state.user)
  const logoutFunction = () => {
    if(name!==''){
      dispatch(logoutResetDetails())
      navigate('/')
    }
    else{
      navigate('/login')
    }
  }
  return (
    <>
      <div className='navBox1'>
        <div className='site_name'>Live bakery</div>
      </div>
      <div className='navBox2'>
        <div className='icon'>
          <div className='user_details'>
          <Link to='/profile'>  <div className='user_name'>{name}</div></Link>
            <button className='button_logout' onClick={logoutFunction}>{name?'Logout':'Login'}</button>
          </div>
          <FontAwesomeIcon icon={faUser} className='user_icon' />
        </div>
      </div>
    </>
  );

}
export default NavBar;