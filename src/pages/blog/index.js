import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'
import BackgroundVideo from '../../components/BackgroundVideo'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <section 
          sx={{
            backgroundColor: "background"
          }}
          >
          {/* <div
            className="full-width-image"
            sx={{
              overflow: "hidden"
            }}
          > */}
            {/* <BackgroundVideo sx={{width: "100vw"}} videoTitle="TestVideo">
                  <source src="/img/compressedwritingvideo.mp4" type="video/mp4" />
            </BackgroundVideo>  */}
          {/* <div
          style={{
            position: 'absolute',
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
          </div> */}
          {/* </div> */}
          <section className="section">
            <div className="container">
              <div className="section">
                <div className="content">
                  <BlogRoll />
                </div>
              </div>
            </div>
          </section>
        </section>
      </Layout>
    )
  }
}


