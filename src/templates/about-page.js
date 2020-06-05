import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { withTheme } from 'styled-components'
import Iframe from 'react-iframe'


export const AboutPageTemplate = ({ 
  title,
  subtitle,
  headerImage,
  imageA,
  imageB,
  imageC,
  coreValuesTest,
  contentComponent,
  whatSlide,
  howSlide,
  whySlide,
  blockquotes,
  visionStatement,
  missionStatement  
 }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const SliderWrap = styled.div`
    .slick-slider {
        .slick-next,
        .slick-prev,
        .slick-prev:before,
        .slick-next:before,
        .slick-prev:hover,
        .slick-prev:focus,
        .slick-next:hover,
        .slick-next:focus {
          color: #3072f9!important;
        }
        .slick-dots li button:before,
        .slick-dots li.slick-active button:before {
          font-size: 7.5px!important;
          color: #3072f9!important;
        }
    }`

  const ValueContent = contentComponent || Content
  return (
    <div sx={{color: "text", backgroundColor: "background"}} className="about-page">
    <SEO title={title} description={missionStatement}/>
    <section className="section section--gradient"
    sx={{
      paddingTop: "5rem"
    }}>
      <div className="container">
        <div className="columns">
          <div className="column"
          sx={{
            height: "50vh",
          }}>
            <Iframe
            url="https://www.tylerdreher.com"
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: '10px',
              boxShadow: '0 1.25em 1.25em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)'
            }}
            />
          </div>
          <div className="column"
            sx={{
              height: "50vh",
            }}>
            <Iframe
            url="https://www.zachslessman.com"
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: '10px',
              boxShadow: '0 1.25em 1.25em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)'
            }}
            />
          </div>
          <div className="column"
            sx={{
              height: "50vh",
            }}>
            <Iframe
            url="https://www.mitchellpousson.com"
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: '10px',
              boxShadow: '0 1.25em 1.25em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)'
            }}
            />
          </div>
          <div className="column"
            sx={{
              height: "50vh",
            }}>
            <Iframe
            url="https://www.zachslessman.com"
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: '10px',
              boxShadow: '0 1.25em 1.25em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02)'
            }}
            />
          </div>
        </div>
      </div>
    </section>
    <section className="section section--gradient">
      <div className="container">
          <div className="columns">
            <div className="column is-full">
                {/* <div className="about-section is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                  sx={{
                    fontFamily: "body",
                    fontWeight: "body",
                  }}>
                  <div className="columns">
                    <div className="column">
                      {visionStatement}
                    </div>
                    <div className="column">
                      {missionStatement}
                    </div>
                  </div>
                </div> */}
                <div className="about-section"
                sx={{
                  marginBottom: 3,
                  paddingBottom: 4,
                }}>
                  <div className="columns slider-row is-vcentered">
                  <div className="column" sx={{minWidth: '50%'}}>
                    <div className="slider-holder">
                    <div className="tile is-size-3-mobile is-size-2-tablet is-size-2-widescreen"
                    sx={{
                      fontFamily: "heading",
                      fontWeight: "heading",
                    }}>
                      {whatSlide.header}
                    </div>
                    <SliderWrap>
                      <Slider {...settings} sx={{height: '90%'}} id="what-id" className="tile">
                        <div className="each-slide">
                          <div className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                          sx={{
                            fontFamily: "body",
                            fontWeight: "body",
                          }}>
                            {whatSlide.slide1}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                          sx={{
                            fontFamily: "body",
                            fontWeight: "body",
                          }}>
                            {whatSlide.slide2}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                          sx={{
                            fontFamily: "body",
                            fontWeight: "body",
                          }}>
                            {whatSlide.slide3}
                          </div>
                        </div>
                      </Slider>
                      </SliderWrap>
                    </div>
                  </div>
                     <div className="column" sx={{minWidth: '50%'}}>
                       <div
                       sx={{
                         marginTop: 4,
                         marginBottom: 4,
                       }}><PreviewCompatibleImage imageInfo={imageA}/></div>
                       <div className="tile blockquote">
                            <blockquote className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                            sx={{
                              fontFamily: "body",
                              fontWeight: "body",
                            }}>
                            {blockquotes.a}
                            </blockquote>
                      </div>
                    </div>
                </div>
                </div>
                <div className="about-section"
                sx={{
                  marginTop: 3,
                  marginBottom: 3,
                  paddingBottom: 4, 
                }}>
                  <div className="columns slider-row  is-vcentered">
                  <div className="column " 
                  sx={{
                    marginTop: 4,
                    minWidth: '50%',
                    }}>
                      <PreviewCompatibleImage imageInfo={imageB}/>
                  </div>
                  <div className="column" sx={{minWidth: '50%'}}>
                    <div className="slider-holder">
                      <div className="tile is-size-3-mobile is-size-2-tablet is-size-2-widescreen"
                      sx={{
                        fontFamily: "heading",

                        fontWeight: "heading",
                      }}>
                        {howSlide.header}
                      </div>
                      <SliderWrap>
                      <Slider {...settings} sx={{height: '90%'}} className="tile">
                        <div className="each-slide">
                          <div className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                          sx={{
                            fontFamily: "body",
                            fontWeight: "body",
                          }}>
                            {howSlide.slide1}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                          sx={{
                            fontFamily: "body",
                            fontWeight: "body",
                          }}>
                            {howSlide.slide2}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                          sx={{
                            fontFamily: "body",
                            fontWeight: "body",
                          }}>
                            {howSlide.slide3}
                          </div>
                        </div>
                      </Slider>
                      </SliderWrap>                 
                    </div>
                  </div>
                </div>
                <div className="tile blockquote">
                            <blockquote className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                            sx={{
                              fontFamily: "body",
                              fontWeight: "body",
                            }}>
                            {blockquotes.c}
                            </blockquote>
                    </div>
                </div>
                <div className="about-section"
                sx={{
                  marginTop: 3,
                  marginBottom: 3,
                  paddingBottom: 4, 
                }}>
                  <div className="columns slider-row is-vcentered">
                  <div className="column" sx={{minWidth: '50%'}}>
                    <div className="slider-holder">
                    <div className="tile is-size-3-mobile is-size-2-tablet is-size-2-widescreen"
                        sx={{
                          fontFamily: "heading",
  
                          fontWeight: "heading",
                    }}>
                      {whySlide.header}
                    </div>
                    <SliderWrap>
                      <Slider {...settings} sx={{height: '90%'}} className="tile">
                        <div className="each-slide">
                          <div className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                          sx={{
                            fontFamily: "body",
                            fontWeight: "body",
                          }}>
                            {whySlide.slide1}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                          sx={{
                            fontFamily: "body",
                            fontWeight: "body",
                          }}>
                            {whySlide.slide2}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                          sx={{
                            fontFamily: "body",
                            fontWeight: "body",
                          }}>
                            {whySlide.slide3}
                          </div>
                        </div>
                      </Slider>
                      </SliderWrap>
                      </div>
                      <div className="blockquote">
                            <blockquote className="is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                            sx={{
                              // backgroundColor: "otherbackground",
                              // borderLeft: "body",
                              // borderLeftColor: "secondary",
                              fontFamily: "body",
                              fontWeight: "body",
                              // borderRadius: "body",
                              // width: "100%",
                            }}>
                            {blockquotes.b}
                            </blockquote>
                      </div>
                  </div>
                     <div className="column" sx={{minWidth: '50%'}}><PreviewCompatibleImage imageInfo={imageC}/></div>
                </div>
                </div>
                  <div className="about-section"
                  sx={{
                    marginTop: 3,
                    marginBottom: 5, 
                  }}>
                    <div className="tile is-size-3-mobile is-size-2-tablet is-size-2-widescreen"
                      sx={{
                        fontFamily: "heading",

                        fontWeight: "heading",
                      }}>
                        {coreValuesTest.mainHeader}
                      </div>
                      <div className="tile is-size-6-mobile is-size-6-tablet is-size-5-widescreen"
                      sx={{
                        fontFamily: "body",
                        fontWeight: "body",
                      }}>
                        {coreValuesTest.tagline}
                      </div>
                      <div>
                      <div className="slider-row">
                      <div className="slider-holder">
                      <SliderWrap>
                        <Slider {...settings} sx={{height: '90%', marginTop: 4,}} className="tile">
                          <div className="each-slide">
                            <div>
                              <div className="tile is-size-3-mobile is-size-2-tablet is-size-3-widescreen" sx={{fontWeight: "heading", fontFamily: "heading"}}>{coreValuesTest.header1}</div>
                              <div className="tile is-size-6-mobile is-size-6-tablet is-size-5-widescreen" sx={{fontWeight: "body", fontFamily: "body"}}>{coreValuesTest.body1}</div>
                            </div>
                          </div>
                          <div className="each-slide">
                          <div>
                              <div className="tile is-size-3-mobile is-size-2-tablet is-size-3-widescreen" sx={{fontWeight: "heading", fontFamily: "heading"}}>{coreValuesTest.header2}</div>
                              <div className="tile is-size-6-mobile is-size-6-tablet is-size-5-widescreen" sx={{fontWeight: "body", fontFamily: "body"}}>{coreValuesTest.body2}</div>
                            </div>
                          </div>
                          <div className="each-slide">
                          <div>
                              <div className="tile is-size-3-mobile is-size-2-tablet is-size-3-widescreen" sx={{fontWeight: "heading", fontFamily: "heading"}}>{coreValuesTest.header3}</div>
                              <div className="tile is-size-6-mobile is-size-6-tablet is-size-5-widescreen" sx={{fontWeight: "body", fontFamily: "body"}}>{coreValuesTest.body3}</div>
                            </div>
                          </div>
                        </Slider>
                      </SliderWrap>
                      </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
    </section>              
            
   </div> 
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <AboutPageTemplate
        title={frontmatter.title}
        subtitle={frontmatter.subtitle}
        headerImage={frontmatter.headerImage}
        imageA={frontmatter.imageA}
        imageB={frontmatter.imageB}
        imageC={frontmatter.imageC}
        imageD={frontmatter.imageD}
        coreValuesTest={frontmatter.coreValuesTest}
        whatSlide={frontmatter.whatSlide}
        howSlide={frontmatter.howSlide}
        whySlide={frontmatter.whySlide}
        blockquotes={frontmatter.blockquotes}
        visionStatement={frontmatter.visionStatement}
        missionStatement={frontmatter.missionStatement}/>
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } })  {
      html
      frontmatter {
        title
        subtitle
        headerImage {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        missionStatement
        visionStatement
        whatSlide {
              header
              slide1
              slide2
              slide3
        }
        howSlide {
              header
              slide1
              slide2
              slide3
        }
        whySlide {
              header
              slide1
              slide2
              slide3
        } 
        coreValuesTest {
              mainHeader
              tagline
              header1
              header2
              header3
              body1
              body2
              body3
        }
        blockquotes {
              a
              b
              c
        }
        imageA {
              widthOptions
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
        }
        imageB {
          widthOptions
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        imageC {
          widthOptions
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        imageD {
          widthOptions
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
`
