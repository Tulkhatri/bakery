import '../header/navBar/style.css'
import '../../App.css'
import { Link } from 'react-router-dom';
import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const Footer = () => {
    const { email } = useSelector(state => state.user)

    const [close, setClose] = useState("none")
    const chatOpen = () => {
        setClose("block")
    }
    const chatClose = () => {
        setClose("none")
    }
    return (
        <>
            <div className='footer'>
                <div className='footer_heading'>Customer services
                    <span>Help Center</span>
                    <span>How to Buy</span>
                    <span>Policies & rules</span>
                </div>
                <div className='footer_heading'>About us
                    <span>About Liverybakery.com</span>
                    <Link to='/contact'><span>Contact Us</span></Link>
                    <span>Digital Payments</span>
                </div>
                <div className='footer_heading'>Sell on Live Bakery
                    <span>Supplier memberships</span>
                    <span>Learning Center</span>
                    <span>Partner Program</span>
                </div>
            </div>
            <div className='copyright'>
                <div className='footer_logo'>Livery Bakery</div>
                <div>© 2023 Livebakery.com All rights reserved.</div>
            </div>
            <Link to={`${email ? "/" : "/login"}`}><div className="message" onClick={() => chatOpen()}>
                <FontAwesomeIcon icon={faMessage} className="message_icon" />
                <div className="message_text"> Message</div>
            </div></Link>
            <div id="chatPopup" style={{ display: close }}>
                <div class="chatHeader">
                    <h3>Chat with us</h3>
                    <span class="closeBtn" onClick={() => chatClose()}>&times;</span>
                </div>
                <div class="chatBody">
                </div>
                <div class="chatFooter">
                    <input type="text" placeholder="Type your message here" />
                    <button>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </>
    );
}
export default Footer;