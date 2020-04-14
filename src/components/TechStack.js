import React, { Component } from 'react'
import { Helmet } from "react-helmet"
import ChevronDown from 'react-feather/dist/icons/chevron-down'
import './Accordion.css'

export default class TechStack extends Component {
    handleClick = event => event.target.classList.toggle('active')
    render() {
        return (
            <React.Fragment>
                <Helmet>
                 <script async src='https://cdn1.stackshare.io/javascripts/client-code.js' charset='utf-8'></script>
                </Helmet>
                <div className="column is-12">
                    <div className="Accordion">
                        <div 
                        className="Accordion--item"
                        onClick={this.handleClick}
                        >
                        <h2>
                            <span>Application and Data</span>
                            <ChevronDown />
                        </h2>
                        <div className='description'>
                            <a frameborder='0' data-theme='dark' data-layers='1' data-stack-embed='true' href='https://embed.stackshare.io/stacks/embed/f2bf411874c7dca75be20ffdbd6446'></a>
                        </div>
                    </div>
                </div>
                </div>
            </React.Fragment>
            
        )
    }

}