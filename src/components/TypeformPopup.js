import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed'
/** @jsx jsx */
import { jsx } from "theme-ui"
class TypeformPopup extends React.Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  render() {
    return (
      <div className="TypeformPopup">
        <ReactTypeformEmbed
          popup
          autoOpen={false}
          url={this.props.url}
          hideHeaders
          hideFooter
          buttonText="Go!"
          style={{ top: 100 , display: 'none'}}
          ref={tf => {
            this.typeformEmbed = tf;
          }}
        />
        <div className="button typeform-button" onClick={this.openForm} style={{ cursor: 'pointer'}}
        sx={{
          padding: 3,
          fontSize: 3,
        }}>
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default TypeformPopup