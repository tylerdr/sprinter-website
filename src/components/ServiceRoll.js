import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes, { nominalTypeHack } from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class ServiceRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: services } = data.allMarkdownRemark
    console.log(data, "DATA")
    return (
      <div className="columns is-multiline">
        {services &&
          services.map(({ node: post }) => (
            <div className="column is-6" key={post.id}>
              <Link to={post.fields.slug}>
                <article
                  sx={{
                    height: "100%",
                    backgroundColor: "otherbackground",
                    color: "text",
                    transition: "0.3s",
                  }}
                  className={`service-list-item tile is-child box  ${
                    post.frontmatter.featuredpost ? 'is-featured' : ''
                  }`}
                >
                <header>
                  {post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      {/* <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.icon,
                          alt: `featured image thumbnail for post ${post.title}`,
                        }}
                      /> */}
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
                    <br></br>
                    <span>{post.frontmatter.description}</span>
                  </p>
                </header>
                {/* <p>
                  {post.frontmatter.description}
                  <br />
                  <br />
                </p> */}
                <span className="float-right show-on-hover"
                  sx={{
                    fontFamily: "body", 
                    fontWeight: "body",
                    //display: "none",
                    color: "transparent",
                    textAlign: "end",
                    }}>
                  {!!post.frontmatter.podcast ? <p>Click to Listen →</p> : <p>Learn More →</p>}
                  </span>
              </article>
              </Link>
            </div>
          ))}
      </div>
    )
  }
}

ServiceRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query ServiceRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "service-page" } } }
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
                description
                templateKey
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                icon {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                  publicURL
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <ServiceRoll data={data} count={count} />}
  />
)
