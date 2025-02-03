import { Client } from "@notionhq/client"

const notion = new Client({
  auth: process.env.NOTION_TOKEN || "",
})

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'equipment' | 'ingredients' | 'merchandise'
  inStock: boolean
  featured: boolean
  details: string
}

export async function getAllProducts(): Promise<Product[]> {
  if (!process.env.NOTION_STORE_DATABASE_ID) {
    console.warn("Missing Notion store database ID")
    return []
  }

  try {
    const database = await notion.databases.query({
      database_id: process.env.NOTION_STORE_DATABASE_ID,
      sorts: [
        {
          property: "Name",
          direction: "ascending",
        },
      ],
    })

    const products = database.results.map((page: any) => {
      return {
        id: page.id,
        name: page.properties.Name?.title?.[0]?.plain_text || "Untitled",
        description: page.properties.Description?.rich_text?.[0]?.plain_text || "",
        price: page.properties.Price?.number || 0,
        image: page.properties.Image?.files?.[0]?.file?.url ||
          page.properties.Image?.files?.[0]?.external?.url || "",
        category: page.properties.Category?.select?.name?.toLowerCase() || "merchandise",
        inStock: page.properties.InStock?.checkbox || false,
        featured: page.properties.Featured?.checkbox || false,
        details: page.properties.Details?.rich_text?.[0]?.plain_text || "",
      }
    })

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: id })
    
    return {
      id: page.id,
      name: (page as any).properties.Name?.title?.[0]?.plain_text || "Untitled",
      description: (page as any).properties.Description?.rich_text?.[0]?.plain_text || "",
      price: (page as any).properties.Price?.number || 0,
      image: (page as any).properties.Image?.files?.[0]?.file?.url ||
        (page as any).properties.Image?.files?.[0]?.external?.url || "",
      category: ((page as any).properties.Category?.select?.name?.toLowerCase() as Product['category']) || "merchandise",
      inStock: (page as any).properties.InStock?.checkbox || false,
      featured: (page as any).properties.Featured?.checkbox || false,
      details: (page as any).properties.Details?.rich_text?.[0]?.plain_text || "",
    }
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}