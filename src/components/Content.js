import React from 'react'
import PropTypes from 'prop-types'
/** @jsx jsx */
import { jsx } from "theme-ui"

export const HTMLContent = ({ content, className }) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: content }} 
  sx={{
    color: "secondary",
  }} />
)

const Content = ({ content, className }) => (
  <div className={className}>{content}
  </div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
