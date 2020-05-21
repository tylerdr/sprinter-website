import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed'

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
        <button className="button" onClick={this.openForm} style={{ cursor: 'pointer' }}>
          Get out there
        </button>
      </div>
    );
  }
}

export default TypeformPopup