import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import './index.css'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0 blog-header"
          style={{
            alignItems: 'left',
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
        }}>
          <h1
            className="is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
            style={{
              color: 'white',
              padding: '1rem',
              lineHeight: '1',
            }}
            sx={{
              fontFamily: 'heading',
              fontWeight: 'heading',
            }}
          >
            Latest Stories
          </h1>
        </div>
        </div>
        <section className="section">
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}


