import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
/** @jsx jsx */
import { jsx } from "theme-ui"
import { Slide } from 'react-slideshow-image';
import './Animations.css'
import { Samy, SvgProxy } from 'react-samy-svg';
import { useTestimonialData } from '../hooks/TestimonialQuery'

const SingleTestimonial = ({ index }) => {
  let {nodes: testData} =  useTestimonialData()
  let testimonials = testData[0].frontmatter.testimonials
  //console.log(testimonials)
  return(
    <div sx={{
      textAlign: "center"
    }}>
      <div className="feautured-thumbnail">
      <Samy path={testimonials[index].image.publicURL}>
        {/* <SvgProxy fill="#000" /> */}
      </Samy>
      </div>
      <div className ="is-size-4-mobile is-size-3-tablet is-size-3-widescreen"
      sx={{
        marginTop: 3, 
        marginBottom: 3
      }}>
        {testimonials[index].quote}
      </div>
      <div className="divider">
      <Samy sx={{margin: "-75px"}}path={testimonials[index].divider.publicURL}>
        {/* <SvgProxy fill="#000" /> */}
      </Samy>
      </div>
      <div className="is-size-5-mobile is-size-5-tablet is-size-5-widescreen">
      - {testimonials[index].author}
      </div>
      <div className="is-size-6-mobile is-size-6-tablet is-size-6-widescreen">
        Industry: {testimonials[index].industry}
      </div>

    </div>
)}

SingleTestimonial.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
    })
  ),
}

export default SingleTestimonial
