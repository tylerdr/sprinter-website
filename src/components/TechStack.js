import React, { Component } from 'react'

export default class TechStack extends Component {
    componentWillMount () {
        const script = document.createElement("script")
        script.src = "https://cdn1.stackshare.io/javascripts/client-code.js"
        script.async = true
        document.body.appendChild(script);
    }

    render() {
        return (
            <div className="column is-12">
                <a frameborder='0' data-theme='dark' data-layers='1,2,3,4' data-stack-embed='true' href='https://embed.stackshare.io/stacks/embed/f2bf411874c7dca75be20ffdbd6446'></a>
            </div>
        )
    }

}