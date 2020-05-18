import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from 'gatsby'
import InstagramFeed from './InstagramFeed'
import GoogleMap from './GoogleMap'
import { SocialIcon } from 'react-social-icons';
import { MapPin, Smartphone, Mail } from 'react-feather';

const Footer = class extends React.Component {
  render() {
    return (
      <div
        sx={{
          backgroundColor: "otherbackground",
        }}>
        <footer className="footer">
          <div>
            <div className="columns is-vcentered"
              sx={{
                marginRight: 4,
                marginLeft: 4,
              }}>
              <div className="column">
                <Link to="/contact" className="tile" sx={{ fontSize: 4, margin: 2 }}>Say Hello</Link>
                <a
                  className="tile"
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
                <a className="tile"
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
                <a className="tile"
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
              <div className="column" sx={{ margin: "auto", textAlign: "center" }}>
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
      </div>
    )
  }
}

export default Footer
