import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes, { nominalTypeHack } from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="column is-6" key={post.id}>
              <Link to={post.fields.slug}>
                <article
                  sx={{
                    height: "100%",
                    backgroundColor: "background",
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
                        fontWeight: "body",
                      }}
                    >
                      {post.frontmatter.title}
                    </Link>
                    <span></span>
                    <span className="is-size-5 is-block">
                      {post.frontmatter.date}
                    </span>
                  </p>
                </header>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                </p>
                <span className="float-right show-on-hover"
                  sx={{
                    fontFamily: "body", 
                    fontWeight: "body",
                    //display: "none",
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
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                podcast {
                  podcastLink {
                    publicURL
                  }
                  podcastTitle
                }
                featuredpost
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
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
