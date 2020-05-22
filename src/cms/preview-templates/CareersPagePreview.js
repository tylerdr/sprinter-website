import React from 'react'
import PropTypes from 'prop-types'
import { CareersPageTemplate } from '../../templates/careers-page'

const CareersPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <CareersPageTemplate
        title={data.title}
        subheading={data.subheading}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

CareersPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default CareersPagePreview