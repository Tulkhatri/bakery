
import './style.css'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { logoutResetDetails } from '../../../redux/actions/userAction'
const NavBar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(state => state.user)
  const logoutFunction = () => {
    dispatch(logoutResetDetails())
  }
  return (
    <>
      <div className='navBox1'> Live Bakery</div>
      <div className='navBox2'>
        <div className='icon'>
          <div className='user_details'>
            <div className='user_name'>{name}</div>
            <button className='button_logout' onClick={logoutFunction}>Logout</button>
          </div>
          <FontAwesomeIcon icon={faUser} className='user_icon' />
        </div>
      </div>
    </>
  );

}
export default NavBar;