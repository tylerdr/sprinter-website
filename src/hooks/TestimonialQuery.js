import { useStaticQuery, graphql } from "gatsby"

export const useTestimonialData = () => {
    const { allMarkdownRemark } = useStaticQuery(
        graphql`
          query testimonialData{
            __typename
            allMarkdownRemark (
              filter: { frontmatter: { templateKey: { eq: "product-page" } } }
            ) {
              nodes {
                frontmatter {
                  testimonials {
                    author
                    quote
                    image {
                      childImageSharp {
                        fluid(maxWidth: 2048, quality: 100) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
            }
        }
        `)
    return allMarkdownRemark
}
