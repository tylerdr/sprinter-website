import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import ServiceRoll from '../components/ServiceRoll'
import Testimonials from '../components/Testimonials'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import BackgroundVideo from '../components/BackgroundVideo'
import Typing from 'react-typing-animation';
import Delayed from '../components/Delayed'
import { faCheck, faCheckDouble, faBorderNone } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IndexPageTemplate = ({
  image,
  title,
  subheading,
  main,
  testimonialsFrontmatter
}) => (
  <div sx={{color:'text'}}>
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
    <section className="section section--gradient"
      sx={{
        backgroundColor: "background"
      }}>
      <div className="container" sx={{color: 'text'}}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="home-animation is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                 sx={{ maxWidth: "60%", margin: "auto", minHeight: "180px"}}>
                   <Typing speed={40}>
                  <div className="columns is-multiline">
                    <div className="column is-12">                        
                        <Delayed waitBeforeShow={1000}>
                        <span>
                        <FontAwesomeIcon icon={faSquare} />&nbsp;&nbsp;Discovering tomorrow's technology
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faCheckSquare} />&nbsp;&nbsp;<a className="animation-emphasized-text" sx={{color: "secondary", fontWeight: "bold"}} >Discovering</a> tomorrow's technology <i>today</i>
                        </span>
                        </Delayed>
                    </div>
                    <div className="column is-12">                        
                        <Delayed waitBeforeShow={1500}>
                        <span>
                        <FontAwesomeIcon icon={faSquare} />&nbsp;&nbsp;Developing tomorrow's technology
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faCheckSquare} />&nbsp;&nbsp;<a className="animation-emphasized-text"  sx={{color: "secondary", fontWeight: "bold"}} >Developing</a> tomorrow's technology <i>today</i>
                        </span>
                        </Delayed>
                    </div>
                    <div className="column is-12">                        
                        <Delayed waitBeforeShow={2000}>
                        <span>
                        <FontAwesomeIcon icon={faSquare} />&nbsp;&nbsp;Delivering tomorrow's technology
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faCheckSquare} />&nbsp;&nbsp;<a className="animation-emphasized-text"  sx={{color: "secondary", fontWeight: "bold"}} >Delivering</a> tomorrow's technology <i>today</i>
                        </span>
                        </Delayed>
                    </div>
                  </div>
                  </Typing>            
                </div>
                    <div className="columns is-multiline">
                      <div className="column is-12 is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                      sx={{
                        fontFamily: "heading",
                        fontWeight: "heading"
                      }}>
                        Services
                      </div>
                      <ServiceRoll location={"home"}/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    <section className="margin-top-0">
    <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                  <div className="column is-12 is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                    sx={{
                    fontFamily: "heading",
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
              <div className="content">
                <div className="columns is-multiline">
                  <div className="column is-12 is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                    sx={{
                    fontFamily: "heading",
                    fontWeight: "heading",
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
  console.log(data, "This Data")
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