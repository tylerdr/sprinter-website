import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import Helmet from 'react-helmet'
import { MapPin, Smartphone, Mail } from 'react-feather'
/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactTypeformEmbed } from 'react-typeform-embed';
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <Layout sx={{color: "text"}}>
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
                  className="is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                  style={{
                    color: 'white',
                    lineHeight: '1',
                    padding: '0.25em',
                  }}
                  sx={{
                    fontFamily: 'heading',
                    fontWeight: 'heading',
                  }}
                >
                Contact Us
                </h1>
                <h3
                  className="is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                  style={{
                    color: 'white',
                    lineHeight: '1',
                    padding: '0.25em',
                  }}
                  sx={{
                    fontWeight: "body",
                    fontFamily: "body",
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
                <div className="column">
                <Helmet>
                  <script src="https://www.google.com/recaptcha/api.js" />
                </Helmet>
                    <form
                    sx={{
                      maxWidth: "75%",
                      margin: "auto",
                      fontFamily: "body",
                    }}
                      name="contact"
                      method="post"
                      action="/contact/thanks/"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
                      // data-netlify-recaptcha="true"
                      onSubmit={this.handleSubmit}
                      className="contact-form"
                    >
                      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                      <input type="hidden" name="form-name" value="contact" />
                      <div hidden>
                        <label>
                          Don’t fill this out:{' '}
                          <input name="bot-field" onChange={this.handleChange} />
                        </label>
                      </div>
                      <p
                      sx={{
                        lineHeight: "3em",
                        fontSize: "1.25em"
                      }}>
                        Hello, my name is&nbsp;
                          <input
                          placeholder="Full Name"
                          sx={{
                            width: "10em",
                            backgroundColor: "otherbackground"
                          }}
                            className="input"
                            type={'text'}
                            name={'name'}
                            onChange={this.handleChange}
                            id={'name'}
                            required={true}
                          />
                      &nbsp;
                          and I would like to know more about&nbsp;
                          <input 
                          sx={{
                            width: "15em",
                            backgroundColor: "otherbackground"
                          }}
                            placeholder="Whatever Interests You"
                            className="input"
                            type={'enquiry'}
                            name={'enquiry'}
                            onChange={this.handleChange}
                            id={'enquiry'}
                            required={true}>
                            {/* <option disabled>
                              Select One
                            </option>
                            <option>I would love to receive your posts in my email</option>
                            <option>Digital Transformation scares me, can you help?</option>
                            <option>I want to know more about working from anywhere</option>
                            <option>Just want to say hello</option> */}
                          </input>
                          &nbsp;.&nbsp;
                        You can reach me at&nbsp;
                          <input
                          sx={{
                            width: "10em",
                            backgroundColor: "otherbackground"
                          }}
                            placeholder="Email"
                            className="input"
                            type={'email'}
                            name={'email'}
                            onChange={this.handleChange}
                            id={'email'}
                            required={true}
                          />
                          &nbsp;.&nbsp;
                          I would also like to add
                          &nbsp;
                          <input
                          sx={{
                            width: "15em",
                            backgroundColor: "otherbackground"
                          }}
                            className="input"
                            placeholder="Any Additional Details"
                            name={'message'}
                            onChange={this.handleChange}
                            id={'message'}
                            required={false}
                          />
                          &nbsp;.&nbsp;
                      </p>
                      {/* <div className="field newsletter control">
                          <input
                            name={'newsletter'}
                            type={'checkbox'}
                            className="checkbox"
                            onChange={this.handleChange}
                            id={'newsletter'}
                          />
                          <span
                          sx={{
                            marginLeft: 2,
                          }}
                          >
                            <label className="label" htmlFor={'newsletter'}
                              sx={{
                                color: 'text',
                                fontWeight: "body",
                                fontFamily: "body",
                              }}>
                              Get Updates (only the important stuff we promise)
                            </label>
                          </span>
                      </div> */}
                      {/* <div
                        className="g-recaptcha"
                        data-sitekey="6LekDb4UAAAAAK2fWolYytmkAxFYkzRdPaf76z-9"
                        data-netlify-recaptcha="true"
                      /> */}
                      <div className="field">
                        <button className="button" type="submit"
                        sx={{
                          fontWeight: "body",
                          fontFamily: "body",
                          float: "right",
                          fontSize: 3
                        }}>
                          Send&nbsp;&nbsp;<FontAwesomeIcon icon={faArrowAltCircleRight}/>
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

