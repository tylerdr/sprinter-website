import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import BackgroundVideo from '../components/BackgroundVideo'
export const IndexPageTemplate = ({
  image,
  title,
  subheading,
  main
}) => (
  <div>
    <div
      className="full-width-image margin-top-0"
       style={{
         backgroundImage: `url(${
           !!image.childImageSharp ? image.childImageSharp.fluid.src : image
         })`,
         backgroundPosition: `top left`,
         backgroundAttachment: `fixed`,
       }}
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
        <h1
          className="is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
          sx={{
            fontWeight: "thin",
            fontFamily: "heading",
          }}
        >
          {title}
        </h1>
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
    <section className="section section--gradient">
      <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile"
                  sx={{
                    padding: 3,
                    margin: 3,
                    marginTop: 4,
                    marginBottom: 4,
                    textAlign: "center",
                    fontSize: 5,
                    fontWeight: "body",
                    fontFamily: "heading",
                  }}>
                    {main.visionStatement}
                  </div>
                    <div className="columns is-multiline" 
                    sx={{
                      margin: 3,
                      marginTop: 4,
                      marginBottom: 4,
                    }}>
                      <div className="column is-12 is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                      sx={{
                        fontFamily: "heading",
                        fontWeight: 100,
                      }}>
                        Services
                      </div>
                      <div className="column is-6">
                        <div className="tile box"
                          sx={{
                            backgroundColor: "otherbackground",
                            color: "text"
                          }}>
                         <div className="tile is-size-4">Product Management</div>
                          <div className="tile is-size-5">content</div>
                        </div>
                      </div>
                      <div className="column is-6">
                        <div className="tile box"
                          sx={{
                            backgroundColor: "otherbackground",
                            color: "text"
                          }}>
                          <div className="tile is-size-4">header</div>
                          <div className="tile is-size-5">content</div>
                        </div>
                      </div>
                      <div className="column is-6">
                        <div className="tile box"
                          sx={{
                            backgroundColor: "otherbackground",
                            color: "text"
                          }}>
                          <div className="tile is-size-4">header</div>
                          <div className="tile is-size-5">content</div>
                        </div>
                      </div>
                      <div className="column is-6">
                        <div className="tile box"
                          sx={{
                            backgroundColor: "otherbackground",
                            color: "text"
                          }}>
                          <div className="tile is-size-4">header</div>
                          <div className="tile is-size-5">content</div>
                        </div>
                      </div>
                    </div>
                  {/* <div                 
                    sx={{
                      margin: 3,
                    }}>
                    { <BackgroundVideo videoTitle={main.video.videoTitle} poster={!!main.video.poster.childImageSharp ? main.video.poster.childImageSharp.fluid.src : main.video.poster }>
                        {main.video.videoFile && <source src={main.video.videoFile.publicURL} type="video/mp4" />}
                    </BackgroundVideo> }
                  </div> */}
                  <div className="tile"
                  sx={{
                    padding: 3,
                    margin: 3,
                    fontFamily: "heading",
                    marginTop: 4,
                    marginBottom: 4,
                    textAlign: "center",
                    fontSize: 5,
                    fontWeight: "body",
                  }}>
                   {main.missionStatement}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    <section className="section section--gradient"
      sx={{
        backgroundColor: "otherbackground"
      }}
    >
      <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="column is-12">
                  <div className="column is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                    sx={{
                    fontFamily: "heading",
                    fontWeight: 100,
                    }}
                  >
                    Latest stories
                  </div>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="button" to="/blog"
                    sx={{
                      fontFamily: "heading",
                    }}
                    >
                      Read more
                    </Link>
                  </div>
                </div>
                </div>
                </div>
            </div>
          </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        main={frontmatter.main}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subheading
        main {
          missionStatement
          visionStatement
          video {
            videoFile {
              publicURL
            }
            videoTitle 
            poster {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image1 {
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
