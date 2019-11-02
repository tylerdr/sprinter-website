import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


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
  coreValues
 }) => {


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
        <div className="section">
          <div className="columns">
            <div className="column is-full">
              <div className="content">
                <div className="content">
                  <div className="tile text-header-content content-margins">
                    <h1>{what.header}</h1>
                  </div>
                  <div className="columns">
                    <div className={"column " + (imageA.widthOptions)}>
                      <div className="content-margins">
                        <PreviewCompatibleImage imageInfo={imageA}/>
                      </div>
                    </div>
                    <div className="column">
                      <div className="tile text-body-content content-margins">
                        <h3>{what.tagline}</h3>
                      </div>
                      <div className="tile text-body-content content-margins">
                        <h3>{what.content1}</h3>
                      </div>
                      <div className="tile text-body-content content-margins">
                        <h3>{what.content2}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="tile text-header-content content-margins">
                    <h1>{how.header}</h1>
                  </div>
                  <div className="tile content-margins">
                      <div className="columns">
                        <div className="column">
                          <div className="text-body-content">
                            <h3>{how.tagline}</h3>
                          </div>
                          <div className="tile text-body-content content-margins">
                            <h3>{how.content1}</h3>
                          </div>
                           <div className="tile text-body-content content-margins">
                            <h3>{how.content2}</h3>
                          </div>
                    </div>
                        <div className={"column " + (imageB.widthOptions)}>
                            <PreviewCompatibleImage imageInfo={imageB}/>
                        </div>
                      </div>
                  </div>
                  <div className="tile text-header-content content-margins">
                    <h1>{why.header}</h1>
                  </div>
                  <div className="tile text-body-content content-margins">
                    <h3>{why.tagline}</h3>
                  </div>
                  <div className="tile text-body-content content-margins">
                      <h3>{why.content1}</h3>
                  </div>
                  <div className="tile text-body-content content-margins">
                      <h3>{why.content2}</h3>
                  </div>
                  <div className={"column " + (imageC.widthOptions)}>
                    <div className="content-margins">
                      <PreviewCompatibleImage imageInfo={imageC}/>
                    </div>
                  </div>
                  <div className="tile text-header-content content-margins">
                    <h1>{coreValues.header}</h1>
                  </div>
                  <div className="columns">
                    <div className={"column " + (imageD.widthOptions)}>
                      <div className="content-margins">
                        <PreviewCompatibleImage imageInfo={imageD}/>
                      </div>
                    </div>
                    <div className="column">
                      <div className="tile text-body-content content-margins">
                        <h3>{coreValues.tagline}</h3>
                      </div>
                      <div className="tile text-body-content content-margins">
                        <h3>{coreValues.content1}</h3>
                      </div>
                      <div className="tile text-body-content content-margins">
                        <h3>{coreValues.content2}</h3>
                      </div>
                    </div>
                  </div>
                  {/* <div className="tile">
                    <h1 className="visionStatement">{main.visionStatement}</h1>
                  </div>
                  <div className="homeImage">
                  <PreviewCompatibleImage imageInfo={main.image1} />
                  </div>
                  <div className="tile">
                    <h1 className="missionStatement">{main.missionStatement}</h1>
                  </div> */}
                  {/* <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div> */}
                </div>
                {/* <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div> */}
                {/* <Features gridItems={intro.blurbs} />
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/products">
                      See all products
                    </Link>
                  </div>
                </div> */}
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
        what={frontmatter.what}
        how={frontmatter.how}
        why={frontmatter.why}
        imageA={frontmatter.imageA}
        imageB={frontmatter.imageB}
        imageC={frontmatter.imageC}
        imageD={frontmatter.imageD}/>
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
              header
            }
        how {
              tagline
              content1
              content2
              header
            }
        why {
              tagline
              content1
              content2
              header
            }
        coreValues {
              tagline
              content1
              content2
              header
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
