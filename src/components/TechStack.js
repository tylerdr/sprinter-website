import React, { Component } from 'react'
import { Helmet } from "react-helmet"

export default class TechStack extends Component {
    render() {
        return (
            <React.Fragment>
                <Helmet>
                 <script async src='https://cdn1.stackshare.io/javascripts/client-code.js' charset='utf-8'></script>
                </Helmet>
                <div className="column is-12">
                    <a frameborder='0' data-theme='dark' data-layers='1,2,3,4' data-stack-embed='true' href='https://embed.stackshare.io/stacks/embed/f2bf411874c7dca75be20ffdbd6446'></a>
                </div>
            </React.Fragment>
            
        )
    }

}