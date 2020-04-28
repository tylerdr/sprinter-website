import React from 'react'
import { navigate } from 'gatsby-link'
import Layout from '../../components/Layout'
import Helmet from 'react-helmet'
import { MapPin, Smartphone, Mail } from 'react-feather'
/** @jsx jsx */
import { jsx } from "theme-ui"
import { ReactTypeformEmbed } from 'react-typeform-embed';

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

  // handleChange = e => {
  //   this.setState({ [e.target.name]: e.target.value })
  // }

  // handleSubmit = e => {
  //   e.preventDefault()
  //   const form = e.target
  //   fetch('/', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     body: encode({
  //       'form-name': form.getAttribute('name'),
  //       ...this.state,
  //     }),
  //   })
  //     .then(() => navigate(form.getAttribute('action')))
  //     .catch(error => alert(error))
  // }

  render() {
    return (
      <Layout sx={{color: "text"}}>
        <section className="section">
          <div className="container">
            <div className="content"
            sx={{
              marginTop: 2,
              fontSize: 4,
            }}>
                <div className="column" sx={{minHeight: "25em", minWidth: "100%"}} >
                  <ReactTypeformEmbed url="https://sprinter.typeform.com/to/Dq6veQ" />
                </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

