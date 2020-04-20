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

export const ProcessPageTemplate = ({
  title,
  subheading
}) => (
  <div sx={{color:'text'}}>
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
    <section className="section section--gradient"
      sx={{
        backgroundColor: "background"
      }}>
      <div className="container" sx={{color: 'text'}}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="home-animation is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                 sx={{ maxWidth: "60%", margin: "auto"}}>
                   <Typing>
                  <div className="columns">
                    <div className="column">                        
                        <Delayed waitBeforeShow={1000}>
                        <FontAwesomeIcon icon={faSquare} />
                        <FontAwesomeIcon icon={faCheckSquare} />
                        </Delayed>
                    </div>
                    <div className="column is-10">
                        <Delayed waitBeforeShow={1000}>
                        <span>Discovering tomorrow's technology today</span>
                        <span><a sx={{color: "secondary", textDecoration: "underline"}} >Discovering</a> tomorrow's technology today</span>
                        </Delayed>
                      </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                        <Delayed waitBeforeShow={1500}>
                        <FontAwesomeIcon icon={faSquare} />
                        <FontAwesomeIcon icon={faCheckSquare} />
                        </Delayed>
                    </div>
                    <div className="column is-10">
                        <Delayed waitBeforeShow={1500}>
                        <span>Developing tomorrow's technology today</span>
                        <span><a sx={{color: "secondary", textDecoration: "underline"}} >Developing</a> tomorrow's technology today</span>
                        </Delayed>
                      </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                        <Delayed waitBeforeShow={2000}>
                        <FontAwesomeIcon icon={faSquare} />
                        <FontAwesomeIcon icon={faCheckSquare} />
                        </Delayed>
                    </div>
                    <div className="column is-10">
                        <Delayed waitBeforeShow={2000}>
                        <span>Delivering tomorrow's technology today</span>
                        <span><a sx={{color: "secondary", textDecoration: "underline"}} >Delivering</a> tomorrow's technology today</span>
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
                      <ServiceRoll/>
                </div>
              </div>
            </div>
          </div>
        </div>
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

ProcessPageTemplate.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
}

const ProcessPage = ({ data }) => {
  console.log(data, "This Data")
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <ProcessPageTemplate
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
    allMarkdownRemark: PropTypes.shape({
      frontmatter: PropTypes.array,
    })
  }),
}

export default ProcessPage

export const pageQuery = graphql`
  query ProcessPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "process-page" } }) {
      frontmatter {
        title
        subheading
      }
    }
  }
`