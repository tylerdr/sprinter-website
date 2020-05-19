import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import ServiceRoll from '../components/ServiceRoll'
import Testimonials from '../components/Testimonials'
import ListAnimation from '../components/ListAnimation'
import Typing from 'react-typing-animation';
import HomePageHeader from '../components/HomePageHeader'
export const IndexPageTemplate = ({
  image,
  title,
  subheading,
  main,
  FirstCallToAction,
  SecondCallToAction,
  ThirdCallToAction
}) => (
  <div sx={{color:'text'}}>
    <div
      className="full-width-image margin-top-0"
      sx={{
        height: "600px",
        textAlign: "center"
      }}
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
          backgroundPosition: `bottom`,
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
            fontFamily: "heading",
            textTransform: "uppercase",
            fontWeight: "heading",
          }}
        >
          {FirstCallToAction.firstLine}
        </h1>
      </div>
      <button>GO</button>
    </div>
    <section className="section section--gradient"
      sx={{
        backgroundColor: "background"
      }}>
      <div className="container" sx={{color: 'text'}}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                    <div className="columns is-multiline">
                      <div className="column is-12 is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                      sx={{
                        fontFamily: "heading",
                        textTransform: "uppercase",
                        fontWeight: "heading"
                      }}>
                        Featured Services
                      </div>
                      <ServiceRoll location={"home"}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    <section className="section section--gradient margin-top-0">
    <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                  <div className="column is-12 is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                    sx={{
                    fontFamily: "heading",
                    textTransform: "uppercase",
                    fontWeight: "heading",
                    }}
                  >
                  Testimonials
                  </div>
              </div>
            </div>
        </div>
    </div>
    </section>
    <section className="margin-top-0 testimonials-holder">
      <Testimonials/>
    </section>
    <section className="section section--gradient"
      sx={{
        backgroundColor: "background"
      }}>
      <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
                <div className="columns is-multiline">
                  <div className="column is-12 is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                    sx={{
                    fontFamily: "heading",
                    textTransform: "uppercase",
                    fontWeight: "heading",
                    }}
                  >
                    Latest stories
                  </div>
                  <BlogRoll homepage={"homepage"} />
                  <div className="column is-12 has-text-centered">
                    <Link className="button" to="/blog"
                    sx={{
                      fontFamily: "heading",
                      textTransform: "uppercase",
                    }}
                    >
                      Read more
                    </Link>
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
  console.log(data, "This Data")
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        subheading={frontmatter.subheading}
        main={frontmatter.main}
        FirstCallToAction={frontmatter.FirstCallToAction}
        SecondCallToAction={frontmatter.SecondCallToAction}
        ThirdCallToAction={frontmatter.ThirdCallToAction}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
    // allMarkdownRemark: PropTypes.shape({
    //   frontmatter: PropTypes.array,
    // })
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
        FirstCallToAction {
          firstLine
        }
        SecondCallToAction {
          firstLine
          statistic
        }
        ThirdCallToAction {
          firstLine
          secondLine
          statistic
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