import { useStaticQuery, graphql } from "gatsby"

export const useServiceRollData = () => {
    const { allMarkdownRemark } = useStaticQuery(
        graphql`
        query ServiceRollQuery {
          allMarkdownRemark(
            filter: { frontmatter: { templateKey: { eq: "service-page" } } }
          ) {
            edges {
              node {
                excerpt(pruneLength: 400)
                id
                fields {
                  slug
                }
                frontmatter {
                  title
                  description
                  order
                  templateKey
                  featuredpost
                  featuredimage {
                    childImageSharp {
                      fluid(maxWidth: 120, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                    publicURL
                  }
                  icon {
                    childImageSharp {
                      fluid(maxWidth: 120, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                    publicURL
                  }
                }
              }
            }
          }
        }
      `)
      return allMarkdownRemark
    }