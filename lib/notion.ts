import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"
import slugify from "slugify"

const notion = new Client({
  auth: process.env.NOTION_TOKEN || "",
})
const n2m = new NotionToMarkdown({ notionClient: notion })

export interface BlogPost {
  id: string
  title: string
  slug: string
  coverImage: string
  excerpt: string
  date: string
  content?: string
}

function generateSlug(title: string): string {
  return slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  })
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!process.env.NOTION_TOKEN || !process.env.NOTION_DATABASE_ID) {
    console.warn("Missing Notion credentials")
    return []
  }

  try {
    const database = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    })

    const posts = await Promise.all(
      database.results.map(async (page: any) => {
        try {
          const title = page.properties.Title?.title?.[0]?.plain_text || "Untitled"
          const slug = generateSlug(title)
          const coverImage = page.properties.Cover?.files?.[0]?.file?.url ||
            page.properties.Cover?.files?.[0]?.external?.url || ""
          const excerpt = page.properties.Excerpt?.rich_text?.[0]?.plain_text || ""
          const date = page.properties.Date?.date?.start || new Date().toISOString()

          // Fetch the page content
          const blocks = await notion.blocks.children.list({
            block_id: page.id,
          })

          // Convert to markdown
          const mdBlocks = await n2m.blocksToMarkdown(blocks.results)
          const content = n2m.toMarkdownString(mdBlocks)

          return {
            id: page.id,
            title,
            slug,
            coverImage,
            excerpt,
            date,
            content: content.parent || "", // Extract the markdown string
          }
        } catch (error) {
          console.error("Error processing post:", error)
          return null
        }
      })
    )

    return posts.filter((post): post is BlogPost => post !== null)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getAllPosts()
  return allPosts.find(p => p.slug === slug) || null
}