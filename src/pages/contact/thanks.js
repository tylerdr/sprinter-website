import React from 'react'
import Layout from '../../components/Layout'
/** @jsx jsx */
import { jsx } from "theme-ui"
export default () => (
  <Layout>
    <section className="section"
    sx={{
      backgroundColor: "background",
      color: "text"
    }}>
      <div className="container">
        <div className="content">
          <h3
          sx={{
             margin: 5,
            }}
            >Thank you for reaching out. We know your time is valuable and appreciate every second that went into your message. We will be sure to respond as promptly as possible. 
            -Sprinter
          </h3>
        </div>
      </div>
    </section>
  </Layout>
)
