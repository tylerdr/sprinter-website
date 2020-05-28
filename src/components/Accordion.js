import React from 'react'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import _kebabCase from 'lodash/kebabCase'
import './Accordion.css'
import { faLongArrowAltRight, faPlus, faMinus, faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
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
            className="column is-6"
            key={`accordion-item-${'-' + index}`}>
            <div
            sx={{
              boxShadow: "body",
              backgroundColor: "otherbackground",
            }}
              className={`Accordion--item`}
              onClick={this.handleClick}
            >
              <div className="flex" sx={{margin: 2, display: "flex", alignItems: "center"}}>
                <div sx={{width: "97%"}}className="is-size-5-mobile is-size-4-tablet is-size-4-widescreen">{item.header}</div>
                <div><FontAwesomeIcon className="plus-icon" sx={{color: "secondary"}} icon={faChevronCircleDown}/></div>
                {/* <div><FontAwesomeIcon className="minus-icon" sx={{color: "secondary"}} icon={faMinus}/></div> */}
              </div>
              <div className="Accordion--item__inner">
                <div className="Accordion--item__content">
                  <div className="Accordion--item__paragraph">
                    <div className="description is-size-5-mobile is-size-5-tablet is-size-5-widescreen"
                      sx={{
                        backgroundColor: "background",
                        padding: 4,
                        fontFamily: "body",
                        fontWeight: "body"
                      }}>
                        <div
                        sx={{
                          margin: 2
                        }}>
                          <div>
                            <FontAwesomeIcon sx={{color: "secondary"}} icon={faLongArrowAltRight}/>&nbsp;&nbsp;&nbsp;<span sx={{fontWeight: "bold"}}>{item.bulletPointOne}</span>
                          </div>
                          <div
                          sx={{
                            fontSize: 2
                          }}>
                            {item.bulletPointOneBody}
                          </div>
                        </div>
                        <div
                        sx={{
                          margin: 2
                        }}
                        >
                          <div>
                            <FontAwesomeIcon sx={{color: "secondary"}} icon={faLongArrowAltRight}/>&nbsp;&nbsp;&nbsp;<span sx={{fontWeight: "bold"}}>{item.bulletPointTwo}</span>
                          </div>
                          <div
                          sx={{
                            fontSize: 2
                          }}
                          >
                            {item.bulletPointTwoBody}
                          </div>
                        </div>
                        <div
                        sx={{
                          margin: 2
                        }}>
                          <div>
                            <FontAwesomeIcon sx={{color: "secondary"}} icon={faLongArrowAltRight}/>&nbsp;&nbsp;&nbsp;<span sx={{fontWeight: "bold"}}>{item.bulletPointThree}</span>
                          </div>
                          <div
                          sx={{
                            fontSize: 2
                          }}>
                            {item.bulletPointThreeBody}
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          ))}
      </div>
    )
  }
}
