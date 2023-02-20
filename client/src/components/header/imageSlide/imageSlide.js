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
        {/* <div className='slilck_div1'>
          <img src="https://www.citycakes.com.np/wp-content/uploads/2019/04/MousseCake_Web-Banner.jpg" alt='' />
        </div> */}

        <div className='slilck_div1'>

          <img src="https://cdn.igp.com/f_auto,q_auto,t_pnopt32prodlp/banners/birthday_d_igp_banner_20221227.jpg" alt='' />
        </div>
        <div className='slilck_div1'>
          <img src="https://cdn.igp.com/f_auto,q_auto,t_pnopt32prodlp/banners/anniversary_d_igp_banner_20221226.jpg" alt='' />
        </div>
        <div className='slilck_div1'>

          <img src="https://cdn.igp.com/f_auto,q_auto,t_pnopt32prodlp/banners/cakes_d_igp_banner_20220920.jpeg" alt='' />
        </div>
      </Slider>
    </div>
  );
}
export default Slideshow