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

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  podcast,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
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
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <h3>{description}</h3>
              <div>
                <ReactPlayer 
                url={podcast.podcastLink.publicURL} 
                playing='true' 
                controls='true'/>
              </div>
            <PostContent className="markdown" content={content} 
            sx={{
              color: "text",
            }}/>
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

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        podcast={post.frontmatter.podcast}
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
