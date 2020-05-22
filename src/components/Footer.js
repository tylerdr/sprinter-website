import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from 'gatsby'
import InstagramFeed from './InstagramFeed'
import GoogleMap from './GoogleMap'
import { SocialIcon } from 'react-social-icons';
import { MapPin, Smartphone, Mail } from 'react-feather';
import { faArrowAltCircleRight, faBorderNone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Footer = class extends React.Component {
  render() {
    return (
      <div
        sx={{
          backgroundColor: "otherbackground",
        }}>
        <footer className="footer container">
          <div>
            <div className="columns is-vcentered">
              <div className="column">
                <div className="tile">
                  <Link to="/contact"
                  sx={{ 
                    fontSize: 4,
                    margin: 2,
                    fontWeight: "body",
                    fontFamily: "body"
                    }}>
                    Say Hello
                  </Link>
                </div>
                <div className="tile">
                <a
                  sx={{
                    margin: 2,
                  }}
                  href={`https://www.google.com.au/maps/search/${encodeURI(
                    "9005 Overlook Blvd"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: 2,
                      fontWeight: "body",
                      fontFamily: "body",
                    }}>
                    <MapPin
                      sx={{
                        marginRight: 3,
                      }}
                    />
                    9005 Overlook Blvd
                    </span>
                </a>
                </div>
                <div className="tile">
                  <a
                    href={`tel:${"+1-615-957-5603"}`}
                    sx={{
                      margin: 2,
                    }}>

                    <span
                      sx={{
                        whiteSpace: "nowrap",
                        fontSize: 2,
                        fontWeight: "body",
                        fontFamily: "body",
                      }}>
                      <Smartphone
                        sx={{
                          marginRight: 3,
                        }}
                      />
                      +1 (615) 601-0782
                        </span>
                  </a>
                </div>
                <div className="tile">
                <a
                  href={`mailto:${"hello@sprinterconsulting.com"}`}
                  sx={{
                    margin: 2,
                  }}>
                  <span
                    sx={{
                      whiteSpace: "nowrap",
                      fontSize: 2,
                      fontWeight: "body",
                      fontFamily: "body",
                    }}>
                    <Mail
                      sx={{
                        marginRight: 3,
                      }}
                    />
                    hello@sprinterconsulting.com
                        </span>
                </a>
                </div>
              </div>
              <div className="column" sx={{ marginTop: "auto", textAlign: "center" }}>
                <div className="social-bar has-text-centered"
                  sx={{
                    marginBottom: -2
                  }}
                >
                  <SocialIcon url="https://instagram.com/sprinterconsulting/"
                    sx={{
                      margin: 1,
                    }} />
                  <SocialIcon url="https://www.linkedin.com/company/sprinterconsulting"
                    sx={{
                      margin: 1,
                    }} />
                  <SocialIcon url="https://twitter.com/Sprinter_HQ"
                    sx={{
                      margin: 1,
                    }} />
                  <SocialIcon url="https://facebook.com"
                    sx={{
                      margin: 1,
                    }} />
                </div>
              </div>
              <div className="column">
              <iframe src="https://sprinter.substack.com/embed" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>

                {/* <InstagramFeed count='3' /> */}
              </div>
            </div>
            <div className="content has-text-centered">
              © Copyright {new Date().getFullYear()} All rights reserved.
             </div>
          </div>
        </footer>
        {/* <div className="foo"
      sx={{
        position: "fixed",
        bottom: "0px",
        width: "100%",
        height: "2.5em",
        backgroundColor: "navbar",
        zIndex: "10",
      }}>
      <div className="ticker-text"
        sx={{
          maxWidth: "50%",
          margin: "auto",
          textAlign: "center",
          height: "2.5em",
          display: "flex",
          alignItems: "flex-end"
        }}>
          <span className="desktop-ticker-text"
          sx={{
            width: "100%",
          }}>Want a question answered immediately? Click the blue chat icon to the right!&nbsp;&nbsp;<FontAwesomeIcon icon={faArrowAltCircleRight}/>
          </span>
          <span className="mobile-ticker-text"
          sx={{
            width: "100%",
            fontSize: "0.8em"
          }}>Get your questions answered immediately!&nbsp;&nbsp;<FontAwesomeIcon icon={faArrowAltCircleRight}/>
          </span>
      </div>
      </div> */}
      </div>
    )
  }
}

export default Footer
