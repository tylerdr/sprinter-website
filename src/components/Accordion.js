import React from 'react'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import _kebabCase from 'lodash/kebabCase'
import './Accordion.css'
import { faBullseye, faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Content, { HTMLContent } from '../components/Content'

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
              className={`Accordion--item `}
              key={`accordion-item-${'-' + index}`}
              onClick={this.handleClick}
            >
              <div className="flex">
                <span>{item.header}</span>
                <FontAwesomeIcon icon={faChevronCircleDown}/>
              </div>
              <div className="description">
                <div>
                <FontAwesomeIcon icon={faBullseye}/>&nbsp;&nbsp;&nbsp;{item.bulletPointOne}
                </div>
                <div>
                <FontAwesomeIcon icon={faBullseye}/>&nbsp;&nbsp;&nbsp;{item.bulletPointTwo}
                </div>
                <div>
                <FontAwesomeIcon icon={faBullseye}/>&nbsp;&nbsp;&nbsp;{item.bulletPointThree}
                </div>
              </div>
            </div>
          ))}
      </div>
    )
  }
}
