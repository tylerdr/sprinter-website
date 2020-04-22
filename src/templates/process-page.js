import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Typing from 'react-typing-animation';
import Content, { HTMLContent } from '../components/Content'


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ProcessPageTemplate = ({
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

ProcessPageTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
}

const ProcessPage = ({ data }) => {
  console.log(data, "This Data")
  const { frontmatter } = data.markdownRemark
  const { html } = data.markdownRemark
  console.log(html, "HTML")
  return (
    <Layout>
      <ProcessPageTemplate
        content = {html}
        contentComponent={HTMLContent}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
      />
    </Layout>
  )
}

ProcessPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),

  }),
}

export default ProcessPage

export const pageQuery = graphql`
  query ProcessPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "process-page" } }) {
      html
      frontmatter {
        title
        subheading
      }
    }
  }
`