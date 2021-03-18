import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
/** @jsx jsx */
import SEO from '../components/seo'
import { jsx } from "theme-ui"
import ServiceRoll from '../components/ServiceRoll'
import TechStack from '../components/TechStack'
import '../components/Accordion.css'
import { v4 } from 'uuid'
import '../components/Animations.css'


export const ProductPageTemplate = ({
  image,
  title,
  heading,
  description,
  intro,
  main,
  testimonials,
  fullImage,
  pricing,
}) => {

  return(
<div sx={{color: "text", backgroundColor: "background"}}>
    {/* <SlidingHeader title={title}/>  */}
    <SEO title={title} description={description}/>
    {/* <div
      className="full-width-image margin-top-0"
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
        Our Services
        </h1>
      </div>
    </div> */}
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-7 is-offset-1">
              <div className="is-size-4-mobile is-size-4-tablet is-size-2-widescreen"
              sx={{
                fontWeight: "heading",
                fontFamily: "heading"
              }}>{heading}</div>
              {/* <div
                sx={{
                  fontWeight: "body",
                  fontFamily: "body"
                }}>
                  {description}
                </div> */}
            </div>
          </div>
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <ServiceRoll/>
              {/* <div className="columns">
                <div className="column is-7">
                  <div className="is-size-3"
                    sx={{
                      fontWeight: "heading",
                      fontFamily: "heading"
                    }}>
                    {main.heading}
                  </div>
                  <div
                    sx={{
                      fontWeight: "body",
                      fontFamily: "body"
                    }}>
                    {main.description}
                  </div>
                </div>
              </div> */}
              {/* <div className="tile is-ancestor">
                <div className="tile is-vertical">
                  <div className="tile">
                    <div className="tile is-parent is-vertical">
                      <article className="tile is-child">
                        <PreviewCompatibleImage imageInfo={main.image1} />
                      </article>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child">
                        <PreviewCompatibleImage imageInfo={main.image2} />
                      </article>
                    </div>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child">
                      <PreviewCompatibleImage imageInfo={main.image3} />
                    </article>
                  </div>
                </div>
              </div> */}
              {/* <div>
              {testimonials.map(testimonial => (
                <article key={v4()} className="message">
                  <div className="message-body">
                    {testimonial.quote}
                    <br />
                    <cite> – {testimonial.author}</cite>
                    </div>
                    </article>))}
                </div> */}
              {/* <div
                className="full-width-image-container"
                style={{
                  backgroundImage: `url(${
                    fullImage.childImageSharp
                      ? fullImage.childImageSharp.fluid.src
                      : fullImage
                  })`,
                }}
              /> */}
              {/* <h2 className="is-12 is-size-3-mobile is-size-2-tablet is-size-1-widescreen">
                {pricing.heading}
              </h2>
              <p className="is-size-5">{pricing.description}</p>
              <Pricing data={pricing.plans} /> */}
              <div>
              <TechStack/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)}

ProductPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  main: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  testimonials: PropTypes.array,
  fullImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  pricing: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    plans: PropTypes.array,
  }),
}

const ProductPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <ProductPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        description={frontmatter.description}
        intro={frontmatter.intro}
        main={frontmatter.main}
        testimonials={frontmatter.testimonials}
        fullImage={frontmatter.full_image}
        pricing={frontmatter.pricing}
      />
    </Layout>
  )
}

ProductPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ProductPage

export const productPageQuery = graphql`
  query ProductPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
        main {
          heading
          description
          image1 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image2 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 526, quality: 92) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          image3 {
            alt
            image {
              childImageSharp {
                fluid(maxWidth: 1075, quality: 72) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        testimonials {
          author
          quote
        }
        full_image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        pricing {
          heading
          description
          plans {
            description
            items
            plan
            price
          }
        }
      }
    }
  }
`
