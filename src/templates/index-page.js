import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import ServiceRoll from '../components/ServiceRoll'
import SingleTestimonial from '../components/SingleTestimonial'
import { Fade } from 'react-slideshow-image';
import TypeformPopup from '../components/TypeformPopup'
import '../components/Accordion.css'
import Accordion from '../components/Accordion'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import BackgroundVideo from '../components/BackgroundVideo'
import { Samy, SvgProxy } from 'react-samy-svg';
import Img from 'gatsby-image'
export const IndexPageTemplate = ({
  image,
  title,
  subheading,
  main,
  FirstCallToAction,
  SecondCallToAction,
  ThirdCallToAction,
  approaches
}) => { 
  const properties = {
    // duration: 7000,
    transitionDuration: 500,
    infinite: true,
    // indicators: true,
    arrows: false,
    pauseOnHover: true,
    autoplay: false,
    // onChange: (oldIndex, newIndex) => {
    //   console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    // }
  }
  return (
  <div sx={{color:'text'}}>
    <div
      className="full-width-image margin-top-0"
      sx={{
        minHeight: "500px",
        height: "90vh",
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
            fontWeight: "heading",
          }}
        >
          {FirstCallToAction.firstLine}
        </h1>
        <div>
      <TypeformPopup text={"Get Out There"} url={"https://sprinter.typeform.com/to/Dq6veQ"}/>
      </div>
      </div>
    </div>
    <section className="section section--gradient"
      sx={{
        backgroundColor: "background"
      }}>
      <div className="container" sx={{color: 'text'}}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
                    <div className="columns is-multiline">
                      <div className="column is-12 is-size-3-mobile is-size-2-tablet is-size-2-widescreen"
                      sx={{
                        fontFamily: "heading",
                        fontWeight: "heading"
                      }}>
                        Featured Services
                      </div>
                      <ServiceRoll location={"home"}/>
                </div>
            </div>
          </div>
        </div>
    </section>
    <section className="section section--gradient"
      sx={{
        backgroundColor: "otherbackground"
      }}>
      <div className="container" sx={{color: 'text'}}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
            <div className="columns is-multiline">
                    <div className="column is-12 is-size-3-mobile is-size-2-tablet is-size-2-widescreen"
                      sx={{
                        fontFamily: "heading",
                        fontWeight: "heading"
                      }}>
                        Sprinter's Approach
                      </div>
                      <Accordion items={approaches} className={"columns is-multiline"}/>
                </div>
            </div>
          </div>
        </div>
    </section>
    {/* <section className="section section--gradient"
      sx={{
        backgroundColor: "otherbackground"
      }}>
      <div className="container" sx={{color: 'text'}}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
                    <div className="columns">
                      <div className="column"
                      sx={{
                        textAlign: "center"
                      }}>
                        <div className="is-size-3-mobile is-size-2-tablet is-size-3-widescreen">                        
                          <SingleTestimonial index={0}/>
                        </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
    </section>
    <section className="testimonials-holder"
    sx={{
      backgroundColor: "background"
    }}>
        <div className="slide-container">
        <Fade {...properties}>
        <div className="each-slide">
          <div className="full-width-image"
          sx={{justifyContent: "end"}}>
            {/* <BackgroundVideo sx={{width: "100vw"}} videoTitle={main.video.videoTitle} poster="https://ucarecdn.com/0e262285-0c89-4147-a833-e8e82dab74b7">
                    {main.video.videoFile && <source src={main.video.videoFile.publicURL} type="video/mp4" />}
                    {console.log(main.video)}
              </BackgroundVideo>  */}
            {/* <div><img src={ThirdCallToAction.image.publicURL}/></div>
            <div className="columns is-multiline" sx={{textAlign: "center", color: "white"}}>
              <div sx={{
                backgroundColor: "rgba(38, 44, 48, .75)",
                maxWidth: "30%",
                padding: 3,
                position: "absolute",
                left: "15px",
                top: "15px",
                borderRadius: "10px"
                }} className="first-tagline is-size-6-mobile is-size-6-tablet is-size-5-widescreen">
                {/* {ThirdCallToAction.firstLine} */}
                {/* <div>
                <div>Worried about your company's outdated systems?</div>
                <div sx={{marginTop: 3, marginBottom: 3}}>You're <i>not</i> the only one.</div> 
                <div>CEOs and senior executives say digital transformation risk is their top concern in 2019.</div>
                </div>
              </div> */}
              {/* <div
              sx={{
                backgroundColor: "transparent",
                position: "absolute",
                right: "700px",
              }}>
                <Samy path={ThirdCallToAction.image.publicURL}>
                        <SvgProxy fill="#000" width="200px"/>
                  </Samy>
              </div> */}
              {/* <div sx={{
                backgroundColor: "transparent",
                position: "absolute",
                maxWidth: "50%",
                backgroundColor: "rgba(38, 44, 48, .75)",
                right: "30px",
                bottom: "30px",
                padding: 3,
                borderRadius: "10px"
                }} className="columns is-size-6-mobile is-size-6-tablet is-size-5-widescreen">
                {/* {ThirdCallToAction.statistic} */}
                {/* <div className="column">
                <Samy path={ThirdCallToAction.icon.publicURL}>
                        <SvgProxy fill="#000" />
                  </Samy>
                </div>
                <div className="column is-7">
                  <div>
                    Curious about a modern solution?
                  </div>
                  <div sx={{marginTop: 3}}>
                  <TypeformPopup sx={{margin: 3}} text={"Lets Talk"} url={"https://sprinter.typeform.com/to/Dq6veQ"}/>
                  </div>
                </div> */}
              {/* </div> */}
              {/* <div sx={{backgroundColor: "transparent"}} className="column is-12 is-size-6-mobile is-size-6-tablet is-size-5-widescreen">
                {/* {ThirdCallToAction.secondLine} */}
              {/* </div> */}
            {/* </div>
          </div>
        </div>
        <div className="each-slide">
          <div className="full-width-image">
            <div className="columns is-multiline" sx={{textAlign: "center", color: "white"}}>
              <div sx={{backgroundColor: "transparent"}} className="column is-12 is-size-6-mobile is-size-6-tablet is-size-5-widescreen">
                {SecondCallToAction.firstLine}
              </div>
              <div sx={{backgroundColor: "transparent"}} className="column is-12 is-size-6-mobile is-size-6-tablet is-size-5-widescreen">
                {SecondCallToAction.statistic}
              </div>
            </div>
          </div>
        </div>
        </Fade>
    </div> */}
    {/* </section>  */}
    {/* <section className="section section--gradient"
      sx={{
        backgroundColor: "otherbackground"
      }}>
      <div className="container" sx={{color: 'text'}}>
          <div className="columns">
            <div className="column is-10 is-offset-1">
                    <div className="columns">
                      <div className="column"
                      sx={{
                        textAlign: "center"
                      }}>
                        <div className="is-size-3-mobile is-size-2-tablet is-size-3-widescreen">                        
                          <SingleTestimonial index={1}/>
                        </div>
                      </div>
                  </div>
            </div>
          </div>
        </div>
    </section> */}
    <section className="section section--gradient"
      sx={{
        backgroundColor: "background"
      }}>
      <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
                <div className="columns is-multiline">
                  <div className="column is-12 is-size-3-mobile is-size-2-tablet is-size-2-widescreen"
                    sx={{
                    fontFamily: "heading",
      
                    fontWeight: "heading",
                    }}
                  >
                    Latest Stories
                  </div>
                  <BlogRoll homepage={"homepage"} />
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
    </section>
  </div>
)}

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
        approaches={frontmatter.approaches}
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
        main {
          video {
            videoTitle
            poster {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            videoFile {
              publicURL
            }
          }
        }
        approaches {
          approachOne{
            header
            bulletPointOne
            bulletPointOneBody
            bulletPointTwo
            bulletPointTwoBody
            bulletPointThree
            bulletPointThreeBody
          }
          approachTwo{
            header
            bulletPointOne
            bulletPointOneBody
            bulletPointTwo
            bulletPointTwoBody
            bulletPointThree
            bulletPointThreeBody
          }
          approachThree{
            header
            bulletPointOne
            bulletPointOneBody
            bulletPointTwo
            bulletPointTwoBody
            bulletPointThree
            bulletPointThreeBody
          }
          approachFour{
            header
            bulletPointOne
            bulletPointOneBody
            bulletPointTwo
            bulletPointTwoBody
            bulletPointThree
            bulletPointThreeBody
          }
        }
        FirstCallToAction {
          firstLine
        }
        SecondCallToAction {
          firstLine
          statistic
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        ThirdCallToAction {
          firstLine
          secondLine
          statistic
          icon {
            publicURL
          }
          image {
            publicURL
          }
        }
      }
    }
  }
`