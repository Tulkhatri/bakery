import '../header/navBar/style.css'
const Footer = () => {
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
                    <span>Contact Us</span>
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

        </>
    );
}
export default Footer;