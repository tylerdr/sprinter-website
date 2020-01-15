import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'
/** @jsx jsx */
import { jsx } from "theme-ui"
import ThemeSwitcher from './theme-switcher'
import { Location } from '@reach/router';


const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
      currentPath: false,
    }
  } 


  componentDidMount = () =>
    this.setState({ currentPath: this.props.location.pathname })

 
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
          backgroundColor: "background",
        }}
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              <img src={logo} alt="Sprinter" style={{ width: '136px' }} />
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
              backgroundColor: "background",
            }}
          >
            <div className="navbar-start has-text-centered">
            <Link className={`navbar-item ${
                this.props.location.pathname.includes('about') ||
                this.props.location.pathname.includes('contact') ||
                this.props.location.pathname.includes('blog') ? '' : 'clicked' }`}
              sx={{
                fontWeight: "heading",
                color: "text",
                backgroundColor: "background",
              }}>
                Home
              </Link>
              <Link className={`navbar-item ${
                this.props.location.pathname.includes('about') ? 'clicked' : '' }`}
               to="/about"
              sx={{
                fontWeight: "heading",
                color: "text",
                backgroundColor: "background",
              }}>
                About
              </Link>
              {/* <Link className="navbar-item" to="/products">
                Our Services
              </Link> */}
              <Link className={`navbar-item ${
                this.props.location.pathname.includes('blog') ? 'clicked' : '' }`}
              to="/blog"
              sx={{
                fontWeight: "heading",
                color: "text",
                backgroundColor: "background",
              }}>
                Blog
              </Link>
              <Link className={`navbar-item ${
                this.props.location.pathname.includes('contact') ? 'clicked' : '' }`}
              to="/contact"
              sx={{
                fontWeight: "heading",
                color: "text",
                backgroundColor: "background",
              }}>
                Contact
              </Link>
              {/* <Link className="navbar-item" to="/contact/examples">
                Form Examples
              </Link> */}
            </div>
            <div className="navbar-end has-text-centered">
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
