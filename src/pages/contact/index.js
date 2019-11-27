import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import Helmet from 'react-helmet'
import { MapPin, Smartphone, Mail } from 'react-feather'
/** @jsx jsx */
import { jsx } from "theme-ui"


function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <div
      className="full-width-image margin-top-0"
        style={{
          backgroundImage: `url('/img/newportri-2-.jpg')`,
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
        Contact Us
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
        We know your time is valuable. That's why we promise to respond promptly to any questions you may have concerning our process. Reach out today and discover the infinite ways we can work together to make your business better.
        </h3>
      </div>
    </div>
        <section className="section">
          <div className="container">
            <div className="content"
            sx={{
              marginTop: 2,
              fontSize: 4,
            }}>
              <div class="columns">
                <div className='contactInformation column'>
                  <h3
                  sx={{
                    margin: 4,
                    marginTop: 0,
                  }}>Contact Form</h3>
                    <a
                      className="tile"
                      sx={{
                        margin: 4,
                      }}
                      // href={`https://www.google.com.au/maps/search/${encodeURI(
                      //   address
                      // )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin 
                      sx={{
                      marginRight: 3,
                      }}
                      /> 
                    <p 
                    sx={{
                      fontSize: 2,
                    }}>9005 Overlook Blvd
                    </p>
                    </a>
                    <a className="tile"
                    sx={{
                      margin: 4,
                    }}>
                      <Smartphone 
                      sx={{
                      marginRight: 3,
                      }}
                      />
                      <p
                      sx={{
                        fontSize: 2,
                      }}>
                       +1 000 000 0000
                       </p>
                    </a>
                    <a className="tile"
                    sx={{
                      margin: 4,
                    }}>
                      <Mail 
                      sx={{
                      marginRight: 3,
                      }}
                        />
                        <p 
                        sx={{
                          fontSize: 2,
                        }}>
                          example@example.com
                        </p>
                    </a>
                </div>
                <div className="column">
                <Helmet>
                  <script src="https://www.google.com/recaptcha/api.js" />
                </Helmet>
                    <form
                      name="contact"
                      method="post"
                      action="/contact/thanks/"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      // data-netlify-recaptcha="true"
                      onSubmit={this.handleSubmit}
                    >
                      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                      <input type="hidden" name="form-name" value="contact" />
                      <div hidden>
                        <label>
                          Don’t fill this out:{' '}
                          <input name="bot-field" onChange={this.handleChange} />
                        </label>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={'name'}
                        sx={{
                          color: "text"
                        }}>
                          Your name
                        </label>
                        <div className="control">
                          <input
                            className="input"
                            type={'text'}
                            name={'name'}
                            onChange={this.handleChange}
                            id={'name'}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={'email'}
                        sx={{
                          color: 'text',
                        }}>
                          Email
                        </label>
                        <div className="control">
                          <input
                            className="input"
                            type={'email'}
                            name={'email'}
                            onChange={this.handleChange}
                            id={'email'}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={'enquiry'}
                        sx={{
                          color: 'text',
                        }}>
                          Type of Enquiry
                        </label>
                        <div className="control">
                          <select 
                          className="input"
                          type={'enquiry'}
                          name={'enquiry'}
                          onChange={this.handleChange}
                          id={'enquiry'}
                          defaultValue="Select One"
                          required={true}>
                          <option disabled>
                            Type of Enquiry
                          </option>
                          <option>I would love to receive your posts in my email</option>
                          <option>Digital Transformation scares me, can you help?</option>
                          <option>I want to know more about working from anywhere</option>
                          <option>Just want to say hello</option>
                          </select>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" htmlFor={'message'}
                        sx={{
                          color: 'text',
                        }}>
                          Message
                        </label>
                        <div className="control">
                          <textarea
                            className="textarea"
                            name={'message'}
                            onChange={this.handleChange}
                            id={'message'}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label>
                          <input
                            name="newsletter"
                            type="checkbox"
                          />
                          <span>Get Updates (only the important stuff we promise)</span>
                        </label>
                      </div>
                      {/* <div
                        className="g-recaptcha"
                        data-sitekey="6LekDb4UAAAAAK2fWolYytmkAxFYkzRdPaf76z-9"
                        data-netlify-recaptcha="true"
                      /> */}
                      <div className="field">
                        <button className="button is-link" type="submit"
                        sx={{
                          marginTop: 2,
                        }}>
                          Send
                        </button>
                      </div>
                    </form>
                    </div>
            </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

