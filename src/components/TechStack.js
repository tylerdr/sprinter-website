import React, { Component } from 'react'
import { Helmet } from "react-helmet"
import TechnologyData from './TechData'
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import './Accordion.css'
/** @jsx jsx */
import { jsx } from "theme-ui"


let colorMode = 'light';
if (typeof window !== 'undefined' && window.localStorage) {
    colorMode = localStorage.getItem('theme-ui-color-mode') || 'light';
    console.log(colorMode, "COLOR MODE")
}
export default class TechStack extends Component {
    handleClick = event => event.target.classList.toggle('active')
    render() {
        return (
            <React.Fragment>
                <Helmet>
                 <script async src='https://cdn1.stackshare.io/javascripts/client-code.js' charset='utf-8'></script>
                </Helmet>
                <div className="column is-12 is-12 is-size-4-mobile is-size-4-tablet is-size-3-widescreen">
                    <div>
                        <div
                         sx={{
                            color: "text",
                            }}>
                            <span sx={{
                                fontWeight: "heading",
                                fontfamily: "heading"
                            }}>Technologies We Use</span>

                        </div>
                        <div className='description'
                        sx={{
                            maxHeight: '500px',
                            overflowY: "scroll",
                            padding: 3
                        }}>
                        <a frameborder="0"data-theme="light" data-layers="1,2,3,4" data-stack-embed="true" href="https://embed.stackshare.io/stacks/embed/f2bf411874c7dca75be20ffdbd6446"/>
                        </div>
                    </div>
                {/* </div> */}
                </div>
            </React.Fragment>
            
        )
    }

}