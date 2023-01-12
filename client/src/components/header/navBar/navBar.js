
import "./style.css"
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector} from 'react-redux'
const NavBar=()=>{
    const {name} = useSelector(state=>state.user)
    const function1=()=>{
        var x = document.getElementById("user_details");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
   else {
    x.style.display = "block";
  }
        
    }
    return(
        <>
       <div className="navBox1"> Live Bakery</div>
       <div className="navBox2">
       <FontAwesomeIcon icon={faUser} className='icon'onMouseOver={function1} />
       </div>
       <div className="user_details" id="user_details">{name}</div>
        </>
    );
    
}
export default NavBar;