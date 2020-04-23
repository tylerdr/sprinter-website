import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'
/** @jsx jsx */
import { jsx } from "theme-ui"
import ThemeSwitcher from './theme-switcher'
import { Location } from '@reach/router';
import './Animations.css'
import ChevronDown from 'react-feather/dist/icons/chevron-down'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
      currentPath: false,
      activeSubNav: false
    }
  } 

  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

  toggleSubNav = subNav =>
    this.setState({
      activeSubNav: this.state.activeSubNav === subNav ? false : subNav
    })

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }


  render() {
    return (
      <nav
        className="navbar is-transparent"
        style={{
          position: "fixed"
        }}
        sx={{
          backgroundColor: "navbar",
          textTransform: "uppercase"
        }}
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand" >
            <Link to="/" className="navbar-item on-hover" title="Logo">
              <img src={logo} alt="Sprinter" style={{ width: '200px', minHeight: "100%" }} />
            </Link>
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
              sx={{
                color: "text",
              }}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
            sx={{
              //backgroundColor: "background",
            }}
          >
            <div className="navbar-start has-text-centered" sx={{marginRight: "auto", marginLeft: "auto"}}>
            <Link className={`navbar-item on-hover ${
                this.props.location.pathname.includes('about') ||
                this.props.location.pathname.includes('services') ||
                this.props.location.pathname.includes('contact') ||
                this.props.location.pathname.includes('process') ||
                this.props.location.pathname.includes('blog') ? '' : 'clicked' }`}
                sx={{
                  fontWeight: "body",
                  color: "text",
                }}>
                  Home
                </Link>
                <div
                    className={`Nav--Group navbar-item ${
                        this.state.activeSubNav === 'services' ? 'active' : ''
                      }`}
                    sx={{
                      fontWeight: "body",
                      color: "text",
                      }}
                    >
                  <span
                    className={`Link Nav--GroupParent ${
                      this.props.location.pathname.includes('services') ||
                      this.props.location.pathname.includes('process')
                        ? 'clicked'
                        : ''
                    }`}
                    onClick={() => this.toggleSubNav('services')}
                    >
                    Services <ChevronDown/>
                  </span>
                  <div className="Nav--GroupLinks" sx={{backgroundColor: "navbar"}}>
                    <Link to="/services" className="Nav--GroupLink navbar-item"
                        sx={{
                        fontWeight: "body",
                        color: "text",
                        }}>
                      Past Projects
                    </Link>
                    <Link to="/process" className="Nav--GroupLink navbar-item"
                        sx={{
                        fontWeight: "body",
                        color: "text",
                        }}>
                      Our Process    
                    </Link>
                    <Link to="/process" className="Nav--GroupLink navbar-item"
                        sx={{
                        fontWeight: "body",
                        color: "text",
                        }}>
                      Benefits    
                    </Link>
                  </div>
                </div>
              <Link className={`navbar-item on-hover ${
                this.props.location.pathname.includes('about') ? 'clicked' : '' }`}
               to="/about"
              sx={{
                fontWeight: "body",
                color: "text",
              }}>
                About
              </Link>
              <Link className={`navbar-item on-hover ${
                this.props.location.pathname.includes('blog') ? 'clicked' : '' }`}
              to="/blog"
              sx={{
                fontWeight: "body",
                color: "text"
              }}>
                Our Ideas
              </Link>
              <Link className={`navbar-item on-hover ${
                this.props.location.pathname.includes('contact') ? 'clicked' : '' }`}
              to="/contact"
              sx={{
                fontWeight: "body",
                color: "text",
                // backgroundColor: "navbar",
              }}>
                Contact
              </Link>
              {/* <Link className="navbar-item" to="/contact/examples">
                Form Examples
              </Link> */}
            </div>
            <div className="navbar-end has-text-centered" sx={{marginLeft: 0}}>
                <span className="icon">
                  <ThemeSwitcher className="button"></ThemeSwitcher>
                </span>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default () => (
<Location>{route => <Navbar {...route} />}</Location>
)
