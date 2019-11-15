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
                    backgroundColor: "primary",
                    borderLeft: "body",
                    borderLeftColor: "secondary",
                    padding: 3,
                    margin: 3,
                    marginTop: 4,
                    marginBottom: 4,
                    borderRadius: "body",
                    boxShadow: "body",
                    fontSize: 5,
                    fontWeight: "heading",
                  }}>
                    {main.visionStatement}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>  
                  <div className="homeImage"
                  sx={{
                    margin: 3,
                  }}>
                  <PreviewCompatibleImage imageInfo={main.image1} />
                  </div>
 <section className="section section--gradient">
      <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile"
                  sx={{
                    backgroundColor: "primary",
                    borderLeft: "body",
                    borderLeftColor: "secondary",
                    padding: 3,
                    margin: 3,
                    marginTop: 4,
                    marginBottom: 4,
                    borderRadius: "body",
                    boxShadow: "body",
                    fontSize: 5,
                    fontWeight: "heading",
                  }}>
                   {main.missionStatement}
                  </div>
                </div>
                <div                 
                sx={{
                  margin: 3,
                }}>
                { <BackgroundVideo videoTitle={main.video.videoTitle} poster="https://ucarecdn.com/0e262285-0c89-4147-a833-e8e82dab74b7">
                    {main.video.videoFile && <source src={main.video.videoFile.publicURL} type="video/mp4" />}
                    {console.log(main.video)}
                </BackgroundVideo> }
                </div>
                <div className="column is-12">
                  <p className="has-text-weight-semibold is-size-2"
                  sx={{
                    color: "text",
                    fontWeight: "heading",
                    fontFamily: "body",
                    fontSize: 4,
                  }}>
                    Latest stories
                  </p>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog"
                    sx={{
                      border: "2px solid",
                      backgroundColor: "primary",
                      fontWeight: "heading",
                      color: "text",
                      borderRadius: "body",
                      borderColor: "secondary",
                      cursor: "pointer",                      
                    }}>
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
