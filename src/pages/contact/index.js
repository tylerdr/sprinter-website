import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
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
  }gat

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
        <section className="section">
          <div className="container">
            <div className="content"
            sx={{
              marginTop: 2,
            }}>
              Contact
              <div class="columns">
                <div className='contactInformation column'
                sx={{
                  padding: 6,
                }}>
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
                      /> 9005 Overlook Blvd
                    </a>
                    <a className="tile"
                    sx={{
                      margin: 4,
                    }}>
                      <Smartphone 
                      sx={{
                      marginRight: 3,
                      }}
                      /> +1 000 000 0000
                    </a>
                    <a className="tile"
                    sx={{
                      margin: 4,
                    }}>
                      <Mail 
                      sx={{
                      marginRight: 3,
                      }}
                        /> example@example.com
                    </a>
                </div>
                <div className="column">
                    <form
                      name="contact"
                      method="post"
                      action="/contact/thanks/"
                      data-netlify="true"
                      data-netlify-honeypot="bot-field"
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
                          className="select"
                          type={'enquiry'}
                          name={'enquiry'}
                          onChange={this.handleChange}
                          id={'enquiry'}
                          required={false}>
                            <option disabled>
                              Select One
                            </option>
                            <option>Need to know more</option>
                            <option>Want to say hello!</option>
                            <option>Found a bug</option>
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
                        <button className="button is-link" type="submit">
                          Send
                        </button>
                      </div>
                      <div
                      className="g-recaptcha"
                      data-sitekey="6LfKN3kUAAAAAGIM1CbXmaRZx3LIh_W2twn1tzkA"
                      />
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
