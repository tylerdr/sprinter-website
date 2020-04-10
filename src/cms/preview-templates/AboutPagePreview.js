import React from 'react'
import PropTypes from 'prop-types'
import { AboutPageTemplate } from '../../templates/about-page'

const AboutPagePreview = ({ entry }) => { 
  const data = entry.getIn(['data']).toJS()
  console.log(data,'data')
  if (data) {
    return (
        <AboutPageTemplate
          title={data.title}
          subtitle={data.subtitle}
          headerImage={data.headerImage}
          imageA={data.imageA}
          imageB={data.imageB}
          imageC={data.imageC}
          imageD={data.imageD}
          coreValuesTest={data.coreValuesTest}
          whatSlide={data.whatSlide}
          howSlide={data.howSlide}
          whySlide={data.whySlide}
          blockquotes={data.blockquotes}
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


{/* <Layout>
<AboutPageTemplate
  title={frontmatter.title}
  subtitle={frontmatter.subtitle}
  headerImage={frontmatter.headerImage}
  imageA={frontmatter.imageA}
  imageB={frontmatter.imageB}
  imageC={frontmatter.imageC}
  imageD={frontmatter.imageD}
  coreValuesTest={frontmatter.coreValuesTest}
  whatSlide={frontmatter.whatSlide}
  howSlide={frontmatter.howSlide}
  whySlide={frontmatter.whySlide}
  blockquotes={frontmatter.blockquotes}/>
</Layout> */}