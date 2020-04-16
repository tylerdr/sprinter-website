import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import './Animations.css'

export class SlidingHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeimgClass: "img-2"
        }
    }
    getNextState = () => {
        console.log(this.state)
        if (this.state.activeimgClass === 'img-1') 
          return { activeimgClass: 'img-2' };
        if (this.state.activeimgClass === 'img-2')
          return { activeimgClass: 'img-3' };
        if (this.state.activeimgClass === 'img-3')
            return { activeimgClass: 'img-1'}
      }
    componentDidMount () {
        this.timer = setInterval(
            () => this.setState(this.getNextState()), 
            5000,
        )
        console.log("MOUNTED")
        console.log(this, "THIS")
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const imgClassList = ["img-1, img-2, img-3"]
        return(
                // {imgClassList.map(imgClass => {
                    // return (
                    <div className="full-width-image margin-top-0"
                    style={{
                        backgroundPosition: `bottom`,
                        backgroundAttachment: `fixed`,
                        }}
                    >
                    <div 
                        className={`full-width-image margin-top-0 header img-1 ${("img-1" === this.state.activeimgClass)? 'active' : ''}`}
                        style={{
                        backgroundPosition: `bottom`,
                        backgroundAttachment: `fixed`,
                        }}>
                        <div
                        style={{
                        display: 'flex',
                        height: '150px',
                        lineHeight: '1',
                        justifyContent: 'space-around',
                        alignItems: 'left',
                        flexDirection: 'column',
                        width: '75%'
                        }}
                        >
                        <h1 
                        className="is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                        style={{
                            color: 'white',
                            lineHeight: '1',
                            padding: '0.25em',
                        }}
                        sx={{
                            fontFamily: "heading",
                            fontWeight: "heading",
                        }}
                        >
                        {this.props.title}
                        </h1>
                        <h3
                        className="is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                        style={{
                            color: 'white',
                            lineHeight: '1',
                            padding: '0.25em',
                        }}
                        sx={{
                            fontWeight: "body",
                            fontFamily: "body",
                        }}
                        >
                        </h3>
                        </div>
                    </div>
                    <div 
                        className={`full-width-image margin-top-0 header img-2 ${("img-2" === this.state.activeimgClass)? 'active' : ''}`}
                        style={{
                        backgroundPosition: `bottom`,
                        backgroundAttachment: `fixed`,
                        }}>
                        <div
                        style={{
                        display: 'flex',
                        height: '150px',
                        lineHeight: '1',
                        justifyContent: 'space-around',
                        alignItems: 'left',
                        flexDirection: 'column',
                        width: '75%'
                        }}
                        >
                        <h1 
                        className="is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                        style={{
                            color: 'white',
                            lineHeight: '1',
                            padding: '0.25em',
                        }}
                        sx={{
                            fontFamily: "heading",
                            fontWeight: "heading",
                        }}
                        >
                        {this.props.title}
                        </h1>
                        <h3
                        className="is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                        style={{
                            color: 'white',
                            lineHeight: '1',
                            padding: '0.25em',
                        }}
                        sx={{
                            fontWeight: "body",
                            fontFamily: "body",
                        }}
                        >
                        </h3>
                        </div>
                    </div>
                    <div 
                        className={`full-width-image margin-top-0 header img-3 ${("img-3" === this.state.activeimgClass)? 'active' : ''}`}
                        style={{
                        backgroundPosition: `bottom`,
                        backgroundAttachment: `fixed`,
                        }}>
                        <div
                        style={{
                        display: 'flex',
                        height: '150px',
                        lineHeight: '1',
                        justifyContent: 'space-around',
                        alignItems: 'left',
                        flexDirection: 'column',
                        width: '75%'
                        }}
                        >
                        <h1 
                        className="is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                        style={{
                            color: 'white',
                            lineHeight: '1',
                            padding: '0.25em',
                        }}
                        sx={{
                            fontFamily: "heading",
                            fontWeight: "heading",
                        }}
                        >
                        {this.props.title}
                        </h1>
                        <h3
                        className="is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                        style={{
                            color: 'white',
                            lineHeight: '1',
                            padding: '0.25em',
                        }}
                        sx={{
                            fontWeight: "body",
                            fontFamily: "body",
                        }}
                        >
                        </h3>
                        </div>
                    </div>
                        
                    </div>
   
                    // )
                // })}
                


        )
    }
}