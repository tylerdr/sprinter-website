import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Typing from 'react-typing-animation';
import Content, { HTMLContent } from '../components/Content'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CareersPageTemplate = ({
  title,
  subheading,
  content,
  contentComponent
}) => {
  const PostContent = contentComponent || Content
  return(
  <div sx={{color:'text'}}>
    <div>
    <div
      className="full-width-image margin-top-0"
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
          width: '75%'
        }}
      >
        <Typing speed={14}>
        <h1
          className="is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
          sx={{
            fontWeight: "heading",
            fontFamily: "heading",
          }}
        >
          {title}
        </h1>
        </Typing>
        <h3
          className="is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
          sx={{
            fontWeight: "body",
            fontFamily: "body",
          }}
        >
          {subheading}
        </h3>
      </div>
    </div>
  </div>
  <section className="section">
    <div className="content container">
            <PostContent className="markdown" content={content} 
            sx={{
              color: "text",
            }}/>
            </div>
  </section>
  </div>
  )}

CareersPageTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
}

const CareersPage = ({ data }) => {
  console.log(data, "This Data")
  const { frontmatter } = data.markdownRemark
  const { html } = data.markdownRemark
  console.log(html, "HTML")
  return (
    <Layout>
      <CareersPageTemplate
        content = {html}
        contentComponent={HTMLContent}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
      />
    </Layout>
  )
}

CareersPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),

  }),
}

export default CareersPage

export const pageQuery = graphql`
  query CareersPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "careers-page" } }) {
      html
      frontmatter {
        title
        subheading
      }
    }
  }
`