import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import ReactPlayer from 'react-player'
/** @jsx jsx */
import { jsx } from "theme-ui"
import styled, { withTheme } from 'styled-components'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const ServicePageTemplate = ({
  content,
  contentComponent,
  description,
  title,
  helmet,
  featuredimage,
}) => {
  const PostContent = contentComponent || Content

return (
    <section className="section"
    sx={{
      color: 'text',
      backgroundColor: 'background'
    }}>
      {helmet || ''}
      <div className="container content">
        <div className="columns"
        sx={{
          marginTop: 4,
        }}>
          <div className="column is-10 is-offset-1"
          sx={{
            color: "text",
          }}>
            <h1 className="title is-size-2" sx={{fontFamily: "heading", textTransform: "uppercase", fontWeight: "heading"}}>
              {title}
            </h1>
            <h3 sx={{fontFamily: "body", fontWeight: "body"}}>{description}</h3>
            <PostContent className="markdown" content={content} 
            sx={{
              color: "text",
              fontFamily: "body",
              fontWeight: "body"
            }}/>

          </div>
        </div>
      </div>
    </section>
  )
}

ServicePageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const ServicePage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <ServicePageTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        featuredimage={post.frontmatter.featuredimage}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

ServicePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ServicePage

export const pageQuery = graphql`
  query ServicePageByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 120, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`