import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components'


export const AboutPageTemplate = ({ 
  title,
  subtitle,
  headerImage,
  what,
  how,
  why,
  imageA,
  imageB,
  imageC,
  imageD,
  coreValuesTest,
  content,
  contentComponent,
  whatSlide,
  howSlide,
  whySlide  
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
    <div>
    <div
      className="full-width-image margin-top-0"
        style={{
          backgroundImage: `url(${
            !!headerImage.childImageSharp ? headerImage.childImageSharp.fluid.src : headerImage
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
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {title}
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {subtitle}
        </h3>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
          <div className="columns">
            <div className="column is-full">
                <div className="about-section">
                  <div className="columns slider-row">
                  <div className="column" sx={{maxWidth: '600px'}}>
                    <div className="slider-holder">
                    <div className="tile"
                    sx={{
                      fontFamily: "heading",
                      fontSize: 6,
                      fontWeight: "heading",
                    }}>
                      {whatSlide.header}
                    </div>
                    <SliderWrap>
                      <Slider {...settings} sx={{height: '90%'}} id="what-id" className="tile">
                        <div className="each-slide">
                          <div
                          sx={{
                            fontFamily: "body",
                            fontSize: 3,
                            fontWeight: "body",
                          }}>
                            {whatSlide.slide1}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div
                          sx={{
                            fontFamily: "body",
                            fontSize: 3,
                            fontWeight: "body",
                          }}>
                            {whatSlide.slide2}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div
                          sx={{
                            fontFamily: "body",
                            fontSize: 3,
                            fontWeight: "body",
                          }}>
                            {whatSlide.slide3}
                          </div>
                        </div>
                      </Slider>
                      </SliderWrap>
                    </div>
                  </div>
                     <div className="column" sx={{minWidth: '200px'}}><PreviewCompatibleImage imageInfo={imageA}/></div>
                </div>
                </div>
                <div className="about-section">
                  <div className="columns slider-row">
                  <div className="column" sx={{minWidth: '200px'}}><PreviewCompatibleImage imageInfo={imageB}/></div>
                  <div className="column" sx={{maxWidth: '600px'}}>
                    <div className="slider-holder">
                      <div className="tile "
                      sx={{
                        fontFamily: "heading",
                        fontSize: 6,
                        fontWeight: "heading",
                      }}>
                        {howSlide.header}
                      </div>
                      <SliderWrap>
                      <Slider {...settings} sx={{height: '90%'}} className="tile">
                        <div className="each-slide">
                          <div
                          sx={{
                            fontFamily: "body",
                            fontSize: 3,
                            fontWeight: "body",
                          }}>
                            {howSlide.slide1}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div
                          sx={{
                            fontFamily: "body",
                            fontSize: 3,
                            fontWeight: "body",
                          }}>
                            {howSlide.slide2}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div
                          sx={{
                            fontFamily: "body",
                            fontSize: 3,
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
                </div>
                <div className="about-section">
                  <div className="columns slider-row">
                  <div className="column" sx={{maxWidth: '800px'}}>
                    <div className="slider-holder">
                    <div className="tile "
                        sx={{
                          fontFamily: "heading",
                          fontSize: 6,
                          fontWeight: "heading",
                    }}>
                      {whySlide.header}
                    </div>
                    <SliderWrap>
                      <Slider {...settings} sx={{height: '90%'}} className="tile">
                        <div className="each-slide">
                          <div
                          sx={{
                            fontFamily: "body",
                            fontSize: 3,
                            fontWeight: "body",
                          }}>
                            {whySlide.slide1}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div
                          sx={{
                            fontFamily: "body",
                            fontSize: 3,
                            fontWeight: "body",
                          }}>
                            {whySlide.slide2}
                          </div>
                        </div>
                        <div className="each-slide">
                          <div
                          sx={{
                            fontFamily: "body",
                            fontSize: 3,
                            fontWeight: "body",
                          }}>
                            {whySlide.slide3}
                          </div>
                        </div>
                      </Slider>
                      </SliderWrap>
                    </div>
                  </div>
                     <div className="column" sx={{minWidth: '200px'}}><PreviewCompatibleImage imageInfo={imageC}/></div>
                </div>
                </div>
                <div className="about-section">
                <div className="tile"
                  sx={{
                    fontFamily: "heading",
                    fontSize: 6,
                    fontWeight: "heading",
                  }}>
                    {coreValuesTest.mainHeader}
                  </div>
                  <div className="tile"
                  sx={{
                    fontFamily: "body",
                    fontSize: 3,
                    fontWeight: "body",
                  }}>
                    {coreValuesTest.tagline}
                  </div>
                    <div
                          sx={{
                            fontSize: 5,
                            fontWeight: "heading",
                            fontFamily: "body",
                            marginTop: 3,
                            fontStyle: "italic",
                          }}>
                          {coreValuesTest.header1}</div>
                          <div
                          sx={{
                            backgroundColor: "primary",
                            borderLeft: "body",
                            borderLeftColor: "secondary",
                            fontFamily: "body",
                            fontSize: 4,
                            padding: 3,
                            fontWeight: "body",
                            borderRadius: "body",
                            boxShadow: "body",
                            marginTop: 3,
                          }}>
                          {coreValuesTest.body1}</div>
                          <div
                          sx={{
                            fontSize: 5,
                            fontWeight: "heading",
                            fontFamily: "body",
                            marginTop: 3,
                            fontStyle: "italic",
                          }}>
                          {coreValuesTest.header2}</div>
                          <div
                          sx={{
                            backgroundColor: "primary",
                            borderLeft: "body",
                            borderLeftColor: "secondary",
                            fontFamily: "body",
                            fontSize: 4,
                            padding: 3,
                            fontWeight: "body",
                            borderRadius: "body",
                            boxShadow: "body",
                            marginTop: 3,
                          }}>
                          {coreValuesTest.body2}</div>
                          <div
                          sx={{
                            fontSize: 5,
                            fontWeight: "heading",
                            fontFamily: "body",
                            marginTop: 3,
                            fontStyle: "italic",
                          }}>
                          {coreValuesTest.header3}</div>
                          <div
                          sx={{
                            backgroundColor: "primary",
                            borderLeft: "body",
                            borderLeftColor: "secondary",
                            fontFamily: "body",
                            fontSize: 4,
                            padding: 3,
                            fontWeight: "body",
                            borderRadius: "body",
                            boxShadow: "body",
                            marginTop: 3,
                          }}>
                          {coreValuesTest.body3}</div>
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
        what={frontmatter.what}
        how={frontmatter.how}
        why={frontmatter.why}
        imageA={frontmatter.imageA}
        imageB={frontmatter.imageB}
        imageC={frontmatter.imageC}
        imageD={frontmatter.imageD}
        coreValuesTest={frontmatter.coreValuesTest}
        whatSlide={frontmatter.whatSlide}
        howSlide={frontmatter.howSlide}
        whySlide={frontmatter.whySlide}/>
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
        what {
              tagline
              content1
              content2
              content3
              header
            }
        how {
              tagline
              content1
              content2
              content3
              header
            }
        why {
              tagline
              content1
              content2
              content3
              header
            }
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
