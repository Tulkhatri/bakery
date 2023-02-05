import './slick.css'
import './slick-theme.css'
import Slider from "react-slick";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}


const Slideshow = () => {
  const settings = {
    // fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className='slick_main'>
      <Slider {...settings}>
        <div className='slilck_div1'>
          <img src="https://daddysbakery.in/wp-content/uploads/2020/01/banner-cake.jpg" alt='' />
        </div>
        <div className='slilck_div1'>
          <img src="https://www.citycakes.com.np/wp-content/uploads/2019/04/MousseCake_Web-Banner.jpg" alt='' />

        </div>

        <div className='slilck_div1'>

          <img src="https://media.istockphoto.com/id/1279805420/photo/chocolate-birthday-cake-with-raspberries-and-candles-on-white-table-and-blue-background-copy.jpg?s=612x612&w=0&k=20&c=8ipQXkOiBD_RaENxIxB6-VgtN7Rycokm3bHML0ZR3Os=" alt='' />
        </div>
        <div className='slilck_div1'>
          <img src="https://www.frenchbaker.co.nz/images/the_french_baker_banner.jpg?crc=3998438801" alt='' />
        </div>
        <div className='slilck_div1'>

          <img src="https://www.highteabakery.com/wp-content/uploads/2020/01/home-banner-cookie-selection.jpg" alt='' />
        </div>
      </Slider>
    </div>
  );
}
export default Slideshow