import React from 'react'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import _kebabCase from 'lodash/kebabCase'
import './Accordion.css'
import { faLongArrowAltRight, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Content, { HTMLContent } from '../components/Content'
/** @jsx jsx */
import { jsx } from "theme-ui"

export default class Accordion extends React.Component {
  static defaultProps = {
    items: [],
    className: ''
  }

  // use state to auto close but has issues mobile view. onClick={() => this.handleClick(index)}
  // state = {
  //   activeItem: null
  // }
  //
  // handleClick = index => {
  //   this.setState({
  //     activeItem: this.state.activeItem === index ? null : index
  //   })
  // }
  handleClick = event => {
    event.target.classList.toggle('active')
    }
  render() {
    const accords = this.props.items
    console.log(accords, "Accords")
    const accordArray = [];
    accordArray.push(this.props.items.approachOne)
    accordArray.push(this.props.items.approachTwo)
    accordArray.push(this.props.items.approachThree)
    accordArray.push(this.props.items.approachFour)
    console.log(accordArray)
    return (
      <div className={`Accordion ${this.props.className}`}>
        {!!accordArray &&
          accordArray.map((item, index) => (
            <div
            sx={{
              boxShadow: "body",
              margin: 3,
              backgroundColor: "otherbackground"
            }}
              className={`Accordion--item `}
              key={`accordion-item-${'-' + index}`}
              onClick={this.handleClick}
            >
              <div className="flex" sx={{margin: 2}}>
                <span className="is-size-5-mobile is-size-4-tablet is-size-4-widescreen">{item.header}</span>
                <FontAwesomeIcon className="plus-icon" sx={{color: "secondary"}} icon={faPlus}/>
                <FontAwesomeIcon className="minus-icon" sx={{color: "secondary"}} icon={faMinus}/>
              </div>
              <div className="description"
              sx={{
                backgroundColor: "background",
                padding: 4,
                fontFamily: "body",
                fontWeight: "body"
              }}>
                <div sx={{
                  margin: 2
                }}>
                <FontAwesomeIcon sx={{color: "secondary"}}icon={faLongArrowAltRight}/>&nbsp;&nbsp;&nbsp;{item.bulletPointOne}
                </div>
                <div sx={{
                  margin: 2
                }}>
                <FontAwesomeIcon sx={{color: "secondary"}} icon={faLongArrowAltRight}/>&nbsp;&nbsp;&nbsp;{item.bulletPointTwo}
                </div>
                <div sx={{
                  margin: 2
                }}>
                <FontAwesomeIcon sx={{color: "secondary"}} icon={faLongArrowAltRight}/>&nbsp;&nbsp;&nbsp;{item.bulletPointThree}
                </div>
              </div>
            </div>
          ))}
      </div>
    )
  }
}
