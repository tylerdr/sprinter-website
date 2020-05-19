import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes, { nominalTypeHack } from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import './Animations.css'
import { useServiceRollData } from '../hooks/ServiceRollQuery'
const ServiceRoll = ( { location }) => {
    let { edges: services } = useServiceRollData()
    if (location){
      let featuredServices = []
      services.forEach((item) => {
        if (item.node.frontmatter.featuredpost == true){
          featuredServices.push(item)
        }
      })
      services = featuredServices
    }
    console.log(services, "EDGES")
    return (
      <div className="columns is-multiline">
        {services &&
          services.map(({ node: post }) => (
            <div className="column is-6" key={post.id}>
                <article
                  sx={{
                    height: "100%",
                    backgroundColor: "otherbackground",
                    color: "text"
                  }}
                  className={`service-list-item tile is-child box  ${
                    post.frontmatter.featuredpost ? 'is-featured' : ''
                  }`}
                >
                <header>
                  {post.frontmatter.icon ? (
                    <div className="featured-thumbnail">
                      <img src={post.frontmatter.icon.publicURL}/>
                      {/* <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.icon,
                          alt: `featured image thumbnail for post ${post.title}`,
                        }}
                      /> */}
                    </div>
                  ) : null}
                  <p className="post-meta"
                  sx={{maxHeight: "60%", marginTop: "auto", marginBottom: "auto"}}>
                    <div
                      className="is-size-4 show-on-hover"
                      to={post.fields.slug}
                      sx={{
                        color: "text",
                        fontFamily: "heading",
                        fontWeight: "heading",
                      }}
                    >
                      {post.frontmatter.title}
                    </div>
                    <br></br>
                    <span
                    sx={{
                      color: "text",
                      fontFamily:"body",
                      fontWeight:"body"
                    }}>{post.frontmatter.description}</span>
                  </p>
                </header>
                {/* <span className="float-right show-on-hover"
                  sx={{
                    fontFamily: "body", 
                    fontWeight: "body",
                    //display: "none",
                    color: "transparent",
                    textAlign: "end",
                    }}>
                  {!!post.frontmatter.podcast ? <p>Click to Listen →</p> : <p>Learn More →</p>}
                  </span> */}
              </article>
            </div>
          ))}
      </div>
    )
  }

ServiceRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export default ServiceRoll