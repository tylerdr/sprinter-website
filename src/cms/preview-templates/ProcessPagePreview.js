import React from 'react'
import PropTypes from 'prop-types'
import { ProcessPageTemplate } from '../../templates/process-page'

const ProcessPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <ProcessPageTemplate
        title={data.title}
        subheading={data.subheading}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

ProcessPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default ProcessPagePreview