import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import Content, { HTMLContent } from '../components/Content'
import ReactPlayer from 'react-player'
/** @jsx jsx */
import { jsx } from "theme-ui"
import styled, { withTheme } from 'styled-components'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import HubspotForm from 'react-hubspot-form'
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  podcast,
  date,
  timeToConsume,
  featuredimage,
  author
}) => {
  const PostContent = contentComponent || Content

return (
    <section className="section"
    sx={{
      backgroundColor: "background",
      color: "text"
    }}>
      <SEO title={title} description={description}/>
      <div className="container content">
        <div className="columns"
        sx={{
          marginTop: 4,
        }}>
          <div className="column is-10 is-offset-1">
            <div sx={{
              fontFamily: "heading",
              fontWeight: "heading",
              textAlign: "center",
              margin: 4,
            }}>
              <h1 className="title is-size-2">
              {title}
            </h1>
            <h3>{description}</h3>
            {!!podcast ? <p>{timeToConsume} min listen</p> : <p>{timeToConsume} min read</p>}
            <p>{author} / {date}</p>
            </div>
            <div
            sx={{
              margin: "auto",
              maxWidth: "75%"
            }}>
              {featuredimage ? <PreviewCompatibleImage imageInfo={featuredimage}/> : ''}
            </div>
            {podcast && (
              <div sx={{maxWidth: "75%", margin: "auto"}}>
                <ReactPlayer 
                url={podcast.podcastLink.publicURL} 
                playing={true} 
                controls={true}
                height='20px'
                width='100%'
                sx={{
                  marginBottom: 3, 
                  marginTop: 3
                }}/>
              </div>
            )}
            <PostContent className="markdown" content={content} 
            sx={{
              color: "text",
              fontFamily: "body",
              fontWeight: "body",
              fontSize: 3,
              margin: "auto",
              marginTop: 4,
              maxWidth: "75%"
            }}/>
            <div sx={{
              maxWidth: "75%",
              margin: "auto",
              marginTop:4
            }}
            className="columns">
            <div className="column is-6" sx={{fontSize: 5}}>
              Sign up for our newsletter <FontAwesomeIcon icon={faLongArrowAltRight}/>
            </div>
            <div className="column is-6">
            <HubspotForm
              portalId="7339867"
              formId="ca6762b7-99c0-4e87-84c1-e23dcf6ed639"
            />
            </div>
            </div>
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
//console.log(post.html, "POSTHTML")
  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        podcast={post.frontmatter.podcast}
        date={post.frontmatter.date}
        timeToConsume={post.frontmatter.timeToConsume}
        author={post.frontmatter.author}
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
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        author
        timeToConsume
        date(formatString: "MMMM DD, YYYY")
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        podcast {
          podcastLink {
            publicURL
          }
          podcastTitle
        }
      }
    }
  }
`
