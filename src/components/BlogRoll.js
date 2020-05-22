import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes, { nominalTypeHack } from 'prop-types'
import { Link, graphql, useStaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import { useBlogRollData } from '../hooks/BlogRollQuery'

const BlogRoll = ( { tag, homepage}) => {
    let { edges: posts } = useBlogRollData()
    if (tag){
      let taggedPosts = []
      posts.forEach((item) => {
        if (item.node.frontmatter.tags.indexOf(tag) > -1) 
          taggedPosts.push(item)
      })
      // console.log(taggedPosts, "TAGGED")
      posts = taggedPosts
    }
    else if (homepage){
      let featuredPosts = []
      posts.forEach((item) => {
        if (item.node.frontmatter.featuredpost == true) 
          featuredPosts.push(item)
      })
      posts = featuredPosts
    }
    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="column is-6" key={post.id}>
              <Link to={post.fields.slug}>
                <article
                  sx={{
                    height: "100%",
                    backgroundColor: "otherbackground",
                    color: "text",
                    transition: "0.3s",
                  }}
                  className={`blog-list-item tile is-child box  ${
                    post.frontmatter.featuredpost ? 'is-featured' : ''
                  }`}
                >
                <header>
                  {post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link
                      className="is-size-4 show-on-hover"
                      to={post.fields.slug}
                      sx={{
                        color: "text",
                        fontFamily: "heading",
                        fontWeight: "heading",
                      }}
                    >
                      {post.frontmatter.title}
                    </Link>
                    <span></span>
                    <span className="is-size-5 is-block"
                    sx={{
                      color: "text",
                      fontFamily:"body",
                      fontWeight:"body"
                    }}>
                      {post.frontmatter.date}
                    </span>
                    <span className="is-size-6 is-block"
                    sx={{
                      color: "text",
                      fontFamily:"body",
                      fontWeight:"body"
                    }}>
                      {!!post.frontmatter.podcast ? <p>{post.frontmatter.length} min</p> : <p>{post.frontmatter.length} min read</p>}
                    </span>
                  </p>
                </header>
                <p
                sx={{
                  fontFamily:"body",
                  fontWeight:"body"
                }}>
                  {post.excerpt}
                  <br />
                  <br />
                </p>
                <span className="float-right show-on-hover"
                  sx={{
                    fontFamily: "body", 
                    fontWeight: "body",
                    color: "transparent",
                    textAlign: "end",
                    }}>
                  {!!post.frontmatter.podcast ? <p>Click to Listen →</p> : <p>Keep Reading →</p>}
                  </span>
              </article>
              </Link>
            </div>
          ))}
      </div>
    )
  }

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default BlogRoll 

