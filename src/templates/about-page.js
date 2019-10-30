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
  imageC
 }) => {


  return (
    <div>
    <div
      className="full-width-image margin-top-0"
        style={{
          backgroundImage: `url(${
            !!headerImage.childImageSharp ? headerImage.childImageSharp.fluid.src : headerImage
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
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
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
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
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
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1>{what.header}</h1>
                  </div>
                  <div className="tile">
                    {what.body}
                  </div>
                  <div>
                    <PreviewCompatibleImage imageInfo={imageA}/>
                  </div>
                  <div className="tile">
                    <h1>{how.header}</h1>
                  </div>
                  <div className="tile">
                    {how.body}
                  </div>
                  <div>
                    <PreviewCompatibleImage imageInfo={imageB}/>
                  </div>
                  <div className="tile">
                    <h1>{why.header}</h1>
                  </div>
                  <div className="tile">
                    {why.body}
                  </div>
                  <div>
                    <PreviewCompatibleImage imageInfo={imageC}/>
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
        imageC={frontmatter.imageC}/>
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
              body
              header
            }
        how {
              body
              header
            }
        why {
              body
              header
            }
        imageA {
              image {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
        }
        imageB {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        imageC {
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
