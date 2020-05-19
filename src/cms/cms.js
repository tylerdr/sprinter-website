import CMS from 'netlify-cms-app'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ServicePagePreview from './preview-templates/ServicePagePreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import ProcessPagePreview from './preview-templates/ProcessPagePreview'
import '../gatsby-plugin-theme-ui/index.js'


CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('process', ProcessPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('our-services', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('services', ServicePagePreview)
