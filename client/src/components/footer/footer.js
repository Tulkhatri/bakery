import '../header/navBar/style.css'
import '../../App.css'
import { Link } from 'react-router-dom';
import { faMessage, faPaperPlane, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//for socket
import io from 'socket.io-client';
// const socket = io();different domain vayekole talako line use gareko
const socket = io("http://localhost:3005");

const Footer = (props) => {
    const navigate = useNavigate()
    const { email, _id } = useSelector(state => state.user)
    const [allMessage, setAllMessage] = useState([]);
    const [sendSingleMessage, setSendSingleMessage] = useState("");
    const [close, setClose] = useState("none")
    const onFormSubmit = e => {
        e.preventDefault();
        const TypedMessageText = document.getElementById('messageText');
        TypedMessageText.value = '';
    }
    const inputRef = useRef();
    const chatOpen = () => {
        setClose("block")
    }
    const chatClose = () => {
        setClose("none")
    }
    const getMessage = async () => {
        const res = await axios.get(`http://localhost:3005/message?userId=${props.getmessageFromId || _id}`)
        setAllMessage(res.data.messageData)
        const messagesEnd = document.querySelector('#scrollerContent');
        messagesEnd.scrollTop = messagesEnd.scrollHeight - messagesEnd.clientHeight;
    }
    const message1 = {
        message: sendSingleMessage,
    }
    const sendMessage = async (values) => {
        values = message1;
        values.userId = props.getmessageFromId || _id;
        values.adminId = props.getmessageFromId;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        };
        try {
            fetch('http://localhost:3005/message', requestOptions)
            getMessage()
        } catch (err) {
            message.error(err, [2])
        }
    }
    useEffect(() => {
        getMessage();
        inputRef.current.focus();
        socket.on('connect', () => {
        });
    }, [props.getmessageFromId]);//admin ma first load mai message dekhauna 

    // useEffect(() => {
    //     getMessage();
    //     socket.on('connect', () => {
    //     });
    // }, []);
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
            <div className="message" onClick={() => chatOpen()}>
                <FontAwesomeIcon icon={faMessage} className="message_icon" />
                <div className="message_text"> Message</div>
            </div>
            <div id="chatPopup" style={{ display: props.messageOpen === "block" ? "block" : close }}>
                <div class="chatHeader">
                    <div className="chatHeader_title">{props.userName || "Live Bakery"}</div>
                    <span class="closeBtn" onClick={() => chatClose()}>&times;</span>
                </div>
                <div class="chatBody" id="scrollerContent">
                    {email ? allMessage.map(items => {
                        return <div className={items.adminId ? "chat_message_admin" : "chat_message"}><span>{items.message}</span></div>
                    }
                    )
                        : <><div>Greeting! </div><div>Please login your account for message</div>
                            <FontAwesomeIcon icon={faRightToBracket} className="messageLogin_icon" onClick={() => navigate("/login")} />
                        </>
                    }
                </div>
                <div class="chatFooter">
                    <form onSubmit={onFormSubmit}>
                        <input type="text" id="messageText" placeholder="Message" ref={inputRef}
                            onChange={(e) => setSendSingleMessage(e.target.value)}
                        />
                        <button type="submit" onClick={() => email ? sendMessage() : navigate('/login')} id="addItems">
                            <FontAwesomeIcon icon={faPaperPlane} className="faPagerPlane" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
export default Footer;