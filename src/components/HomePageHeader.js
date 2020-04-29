import React from 'react'
import PropTypes from 'prop-types'
/** @jsx jsx */
import { jsx } from "theme-ui"
import { Fade } from 'react-slideshow-image';
import './Animations.css'
import TypeformPopup from './TypeformPopup'
import { useTestimonialData } from '../hooks/TestimonialQuery'
import { Link } from 'gatsby'
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePageHeader = () => {
    let {nodes: testData} =  useTestimonialData()
    let testimonials = testData[0].frontmatter.testimonials
    const properties = {
        duration:10000,
        transitionDuration: 1500,
        infinite: true,
        arrows: true,
        pauseOnHover: true
      }

    return(
        <div className="home-page-header slide-container">
        <Fade {...properties}>
        <div className="each-slide">
          <div className="full-width-image" sx={{height: "600px"}}
          style={{
            backgroundImage: `url(${
              !!testimonials[1].image.childImageSharp ? testimonials[1].image.childImageSharp.fluid.src : testimonials[0].image
            })`,
          }}>
              <div className="home-header-description" sx={{ontFamily:'heading', fontWeight: 'heading', color: "white", fontSize: 4, position: "absolute", left: "1em", bottom: "3em"}}>
                <div sx={{margin: 4}}>Interested in working from anywhere?</div>
                <div sx={{margin: 4}}><Link className="home-header-button" to="/contact"><span className="home-header-button-text">REACH OUT TO US <FontAwesomeIcon icon={faExternalLinkSquareAlt}/></span></Link></div>
              </div>
          </div>
        </div>
        <div className="each-slide">
          <div className="full-width-image" sx={{height: "600px"}}
          style={{
            backgroundImage: `url(${
              !!testimonials[0].image.childImageSharp ? testimonials[0].image.childImageSharp.fluid.src : testimonials[1].image
            })`,
          }}>
            <div className="home-header-description" sx={{ontFamily:'heading', fontWeight: 'heading', color: "white", fontSize: 4, position: "absolute", left: "1em", bottom: "3em"}}>
              <TypeformPopup />
              </div>
          </div>
        </div>
        <div className="each-slide">
          <div className="full-width-image" sx={{height: "600px"}}
          style={{
            backgroundImage: `url(${
              !!testimonials[2].image.childImageSharp ? testimonials[2].image.childImageSharp.fluid.src : testimonials[2].image
            })`,
          }}>
            <span sx={{backgroundColor: "transparent"}} className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen">
              {testimonials[2].quote}
              <br />
              <cite> – {testimonials[2].author}</cite>
            </span>
          </div>
        </div>
        </Fade>
        </div>
        
    )

}

export default HomePageHeader