import React from 'react'
import PropTypes from 'prop-types'
import { AboutPageTemplate } from '../../templates/about-page'

const AboutPagePreview = ({ entry, widgetFor, getAsset }) => (
  <AboutPageTemplate
    title={entry.getIn(['data', 'title'])}
    headerImage={entry.getIn(['data', 'headerImage'])}
    subtitle={entry.getIn(['data', 'subtitle'])}
    what={{
      body: entry.getIn(['data', 'what', 'body']),
      header: entry.getIn(['data', 'what', 'header']),
      image: getAsset(entry.getIn(['data', 'what', 'image']))
    }}
    how={{
      body: entry.getIn(['data', 'how', 'body']),
      header: entry.getIn(['data', 'how', 'header']),
      image: getAsset(entry.getIn(['data', 'what', 'image']))
    }}
    why={{
      body: entry.getIn(['data', 'why', 'body']),
      header: entry.getIn(['data', 'why', 'header']),
      image: getAsset(entry.getIn(['data', 'why', 'image']))
    }}
    content={widgetFor('body')}
  />
)

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
  widgetFor: PropTypes.func,
}

export default AboutPagePreview
