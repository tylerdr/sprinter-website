import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes, { nominalTypeHack } from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import './Animations.css'
import { useServiceRollData } from '../hooks/ServiceRollQuery'
import { Samy, SvgProxy } from 'react-samy-svg';

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
    console.log(services.map(({node: {frontmatter: data}}) => data.order), "before")

    services.sort(({node: {frontmatter: {order: a}}}, {node: {frontmatter: {order: b}}}) => {
      console.log(a , b );
      return a - b
    })
    console.log(services.map(({node: {frontmatter: data}}) => data.order), "after")
    return (
      <div className="columns is-multiline">
        {services &&
          services.map(({ node: post }) => (
            <div className="column is-6" key={post.id}>
                <article
                  sx={{
                    height: "100%",
                    backgroundColor: "floatingCard",
                    color: "text"
                  }}
                  className={`service-list-item tile is-child box  ${
                    post.frontmatter.featuredpost ? 'is-featured' : ''
                  }`}
                >
                <header>
                  {post.frontmatter.icon ? (
                    <div className="featured-thumbnail">
                      <Samy path={post.frontmatter.icon.publicURL}>
                        {/* <SvgProxy fill="#000" /> */}
                      </Samy>
                    </div>
                  ) : null}
                  <div className="post-meta"
                  sx={{maxHeight: "60%", margin: "1em"}}>
                    <div
                      className="is-size-4 show-on-hover"
                      to={post.fields.slug}
                      sx={{
                        color: "text",
                        fontFamily: "heading",
                        fontWeight: "heading",
                        textAlign: "center"
                      }}
                    >
                      {post.frontmatter.title}
                    </div>
                  </div>
                </header>
                <div>
                <span
                    sx={{
                      color: "text",
                      fontFamily:"body",
                      fontWeight:"body"
                    }}>{post.frontmatter.description}</span>
                </div>
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