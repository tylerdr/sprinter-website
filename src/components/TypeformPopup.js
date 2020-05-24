import React from 'react'
import { ReactTypeformEmbed } from 'react-typeform-embed'
import { Helmet } from "react-helmet"
/** @jsx jsx */
import { jsx } from "theme-ui"
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          fontSize: 3,
        }}>
          {this.props.text}&nbsp;&nbsp;<FontAwesomeIcon icon={faArrowAltCircleRight}/>
        </div>
      </div>
      // <React.Fragment>
      //   <Helmet>
      //   <script src="https://public-assets.typeform.com/confab/embed.js" async></script>
      //   </Helmet>
      //   <div className="cui-embed" 
      //   sx={{
      //     height: "400px",
      //     width: "100%",
      //     position: "absolute",
      //     zIndex: '10'
      //     }}
      //     data-cui-uid="Ruwh1U"
      //     data-cui-mode="widget"
      //     data-cui-pill-button-color="#0000FF">
      //     </div>
      // </React.Fragment>
     
    );
  }
}

export default TypeformPopup