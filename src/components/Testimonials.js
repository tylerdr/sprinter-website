import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
/** @jsx jsx */
import { jsx } from "theme-ui"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { withTheme } from 'styled-components'


const Testimonials = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  const SliderWrap = styled.div`
    .slick-slider {
        .slick-next,
        .slick-prev,
        .slick-prev:before,
        .slick-next:before,
        .slick-prev:hover,
        .slick-prev:focus,
        .slick-next:hover,
        .slick-next:focus {
          color: #3072f9!important;
        }
        .slick-dots li button:before,
        .slick-dots li.slick-active button:before {
          font-size: 7.5px!important;
          color: #3072f9!important;
        }
    }`
  return(
  <div 
  sx={{
    marginTop: 4,
    marginBottom: 4,
  }}>
    <SliderWrap>
      <Slider {...settings} className="tile">
      {testimonials.map(testimonial => (
        <div className="each-slide">
          <div sx={{
            width: "50%",
            margin: "auto",
            textAlign: "center",
            marginTop: 4,
            marginBottom: 4
          }}>
            {testimonial.quote}
            <br />
            <cite> – {testimonial.author}</cite>
            </div>
        </div>
      ))}
      </Slider>
    </SliderWrap>
  </div>
)}

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
    })
  ),
}

export default Testimonials
