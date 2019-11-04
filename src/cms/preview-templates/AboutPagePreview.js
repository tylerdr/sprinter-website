import React from 'react'
import PropTypes from 'prop-types'
import { AboutPageTemplate } from '../../templates/about-page'

const AboutPagePreview = ({ entry }) => { 
  const data = entry.getIn(['data']).toJS()
  {console.log(data)}
  if (data) {
    return (
        <AboutPageTemplate
          title={data.title}
          headerImage={data.headerImage}
          subtitle={data.subtitle}
          what={data.what}
          how={data.how}
          why={data.why}
          coreValues={data.coreValues}
          imageA={data.imageA}
          imageB={data.imageB}
          imageC={data.imageC}
          imageD={data.imageD}
        />
    )
    } else {
      return <div>Loading...</div>
    }
  }

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
  widgetFor: PropTypes.func,
}

export default AboutPagePreview
