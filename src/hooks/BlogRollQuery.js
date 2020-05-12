import { useStaticQuery, graphql } from "gatsby"

export const useBlogRollData = () => {
    const { allMarkdownRemark } = useStaticQuery(
        graphql`
          query blogRollData{
            allMarkdownRemark(
              sort: { order: DESC, fields: [frontmatter___date] }
              filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
            ) {
              edges {
                node {
                  excerpt(pruneLength: 300)
                  id
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                    templateKey
                    author
                    length
                    date(formatString: "MMMM DD, YYYY")
                    podcast {
                      podcastLink {
                        publicURL
                      }
                      podcastTitle
                    }
                    featuredpost
                    featuredimage {
                      childImageSharp {
                        fluid(maxWidth: 120, quality: 100) {
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
