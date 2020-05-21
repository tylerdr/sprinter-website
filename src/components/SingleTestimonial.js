import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
/** @jsx jsx */
import { jsx } from "theme-ui"
import { Slide } from 'react-slideshow-image';
import './Animations.css'
import { useTestimonialData } from '../hooks/TestimonialQuery'

const SingleTestimonial = ({ index }) => {
  let {nodes: testData} =  useTestimonialData()
  let testimonials = testData[0].frontmatter.testimonials
  return(
    <div>
      {testimonials[index].quote} - {testimonials[index].author}
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
