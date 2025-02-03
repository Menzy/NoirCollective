import { getAllProducts, getProductById } from "@/lib/notion-store"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { Card } from "@/components/ui/card"
import AddToCartButton from "@/components/store/AddToCartButton"

interface ProductPageProps {
  params: {
    id: string
  }
}

export const revalidate = 3600 // Revalidate every hour

// Generate static paths for all products
export async function generateStaticParams() {
  try {
    const products = await getAllProducts()
    
    if (!products || products.length === 0) {
      console.warn("No products found for static path generation")
      return []
    }

    // Map all product IDs and ensure they're valid
    const paths = products
      .filter(product => product && product.id) // Only include products with valid IDs
      .map((product) => ({
        id: product.id,
      }))

    console.log(`Generated static paths for ${paths.length} products`)
    return paths
  } catch (error) {
    console.error("Error generating static params for products:", error)
    return []
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  if (!params.id) {
    console.error("No product ID provided")
    notFound()
  }

  try {
    const product = await getProductById(params.id)

    if (!product) {
      console.error(`Product not found for ID: ${params.id}`)
      notFound()
    }

    // Default image if none provided
    const productImage = product.image || "https://images.unsplash.com/photo-1553484771-047a44eee27a"

    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 p-6">
              <div className="relative h-[400px] md:h-[500px]">
                <Image
                  src={productImage}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
              
              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <Badge variant={product.inStock ? "default" : "destructive"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary">{product.category}</Badge>
                  {product.featured && <Badge>Featured</Badge>}
                </div>
                
                <p className="text-xl font-bold mb-4">GH₵ {product.price.toFixed(2)}</p>
                
                <p className="text-muted-foreground mb-6">{product.description}</p>
                
                {product.details && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Product Details</h2>
                    <p className="text-muted-foreground">{product.details}</p>
                  </div>
                )}
                
                <div className="mt-auto">
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    console.error(`Error fetching product ${params.id}:`, error)
    notFound()
  }
}