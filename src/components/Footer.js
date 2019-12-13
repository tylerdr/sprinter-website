import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from 'gatsby'
import InstagramFeed from './InstagramFeed'
import GoogleMap from './GoogleMap'
import { SocialIcon } from 'react-social-icons';

const Footer = class extends React.Component {
  render() {
    return (
      <div>
      <InstagramFeed count="8"
      sx={{
        backgroundColor: "primary",
      }}/>
      <footer className="footer">
        {/*<div className="has-text-centered">*/}
        {/*  <img*/}
        {/*    src={logo}*/}
        {/*    alt="Sprinter"*/}
        {/*    style={{ width: '14em', height: '10em' }}*/}
        {/*  />*/}
        {/*</div>*/}
        <div>
            <div className="columns is-vcentered" 
            sx={{
              marginRight: 4,
              marginLeft: 4,
            }}>
              <div className="column">
                <div className="tile"
                sx={{
                  color: "text",
                  fontSize: 4,
                }}>
                  For questions, call us at 1-000-000-000 or email us at example@example.com.
                </div>
              </div>
              <div className="column is-7">
                <GoogleMap />
              </div>
              <div className="column">
                <p
                sx={{
                        fontFamily: "body",
                        fontSize: 3,
                        padding: 3,
                        margin: 3,
                        fontWeight: "body",
                }}>Our passion for technology combined with our love of travel has allowed us to work in some of the most beautiful places in the world. The map to the left pinpoints all of our temporary offices where we’ve opened our laptops while enjoying breathtaking cities, scenery and culture.</p>
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
