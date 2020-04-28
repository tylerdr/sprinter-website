import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from 'gatsby'
import InstagramFeed from './InstagramFeed'
import GoogleMap from './GoogleMap'
import { SocialIcon } from 'react-social-icons';
import { MapPin, Smartphone, Mail } from 'react-feather'

const Footer = class extends React.Component {
  render() {
    return (
      <div>
      <InstagramFeed count="8"
      sx={{
        backgroundColor: "primary",
      }}/>
      <footer className="footer">
        <div>
             <div className="columns is-vcentered" 
            sx={{
              marginRight: 4,
              marginLeft: 4,
            }}> 
               <div className="column">
                 <Link to="/contact" className="tile" sx={{fontSize: 6, margin: 4}}>Say Hello</Link>
                  <a
                      className="tile"
                      sx={{
                        margin: 4,
                      }}
                      href={`https://www.google.com.au/maps/search/${encodeURI(
                       "9005 Overlook Blvd"
                      )}`}
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
                      fontWeight: "body",
                      fontFamily: "body",
                    }}>9005 Overlook Blvd
                    </p>
                    </a>
                    <a className="tile"
                    href={`tel:${"+1-615-957-5603"}`}
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
                        fontWeight: "body",
                        fontFamily: "body",
                      }}>
                       +1 (615) 601-0782
                       </p>
                    </a>
                    <a className="tile"
                    href={`mailto:${"hello@sprinterconsulting.com"}`}
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
                          fontWeight: "body",
                          fontFamily: "body",
                        }}>
                          hello@sprinterconsulting.com
                        </p>
                    </a>
              </div> 
               <div className="column is-7"
              sx={{margin:"auto"}}>
                <GoogleMap />
              </div> 
               <div className="column" sx={{margin:"auto"}}>
               <iframe src="https://sprinter.substack.com/embed" width="480" height="320" frameborder="0" scrolling="no"></iframe> 
              </div> 
             </div> 
            <div className="social-bar has-text-centered" >
            <SocialIcon url="https://instagram.com/sprinterconsulting/" 
            sx={{
              margin: 1,
            }}/>
            <SocialIcon url="https://www.linkedin.com/company/sprinterconsulting" 
            sx={{
              margin: 1,
            }}/>
            <SocialIcon url="https://twitter.com/Sprinter_HQ" 
            sx={{
              margin: 1,
            }}/>
            <SocialIcon url="https://facebook.com" 
            sx={{
              margin: 1,
            }}/>
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
