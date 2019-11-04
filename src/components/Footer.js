import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from 'gatsby'
import logo from '../img/logo.svg'
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'
import InstagramFeed from './InstagramFeed'

const Footer = class extends React.Component {
  render() {
    return (
      <div>
      <InstagramFeed count="8"/>
      <footer className="footer">
        <div className="has-text-centered">
          <img
            src={logo}
            alt="Sprinter"
            style={{ width: '14em', height: '10em' }}
          />
        </div>
        <div className="has-text-centered">
          <div className="container">
            <div className="columns">
              <div className="column is-4">
                <div className="tile">
                      <Link to="/" className="navbar-item"
                      sx={{
                        color: "text",
                      }}>
                        Home
                      </Link>
                </div>
                <div className="tile">
                      <Link className="navbar-item" to="/about"
                      sx={{
                        color: "text",
                      }}>
                        About
                      </Link>
                </div>
              </div>
              <div className="column is-4">
                <div className="tile">
                      <Link className="navbar-item" to="/blog"
                      sx={{
                        color: "text",
                      }}>
                        Latest Stories
                      </Link>
                </div>
                <div className="tile">
                      <Link className="navbar-item" to="/contact"
                      sx={{
                        color: "text",
                      }}>
                        Contact
                      </Link>
                </div>
              </div>
              <div className="column is-4 social">
                <a title="facebook" href="https://facebook.com">
                  <img
                    src={facebook}
                    alt="Facebook"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="twitter" href="https://twitter.com/Sprinter_HQ">
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="instagram" href="https://instagram.com/sprinterconsulting">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="vimeo" href="https://vimeo.com">
                  <img
                    src={vimeo}
                    alt="Vimeo"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div>
            </div>
            <div className="content has-text-centered">
            © Copyright {new Date().getFullYear()} All rights reserved.
             </div>
          </div>
        </div>
      </footer>
      </div>
    )
  }
}

export default Footer
