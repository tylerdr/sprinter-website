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
              <Link to={"/our-services"} className={location ? '': 'no-pointer-events'}>
                <article
                  sx={{
                    height: "100%",
                    backgroundColor: "floatingCard",
                    color: "text",
                    transition: "0.3s",
                  }}
                  className={`service-list-item tile is-child box  ${
                    post.frontmatter.featuredpost ? 'is-featured' : ''
                  }`}
                >
                <header>
                  {post.frontmatter.icon ? (
                    <div className="featured-thumbnail" sx={{margin: "0.5em"}}>
                      <Samy path={post.frontmatter.icon.publicURL}>
                        {/* <SvgProxy fill="#000" /> */}
                      </Samy>
                    </div>
                  ) : null}
                  <div className="post-meta"
                  sx={{margin: "0.5em"}}>
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
                {location ? '':
                <div>
                <span
                    sx={{
                      color: "text",
                      fontFamily:"body",
                      fontWeight:"body"
                    }}>{post.frontmatter.description}</span>
                </div>}
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
              </Link>
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