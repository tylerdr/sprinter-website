import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"

class Delayed extends React.Component {

    constructor(props) {
        super(props);
        this.state = {hidden : true};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({hidden: false});
        }, this.props.waitBeforeShow);
    }

    render() {
        return this.state.hidden ? this.props.children[0] : this.props.children[1];
    }
}



export default Delayed;