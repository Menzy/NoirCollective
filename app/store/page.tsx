import { getAllProducts } from "@/lib/notion-store"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

export default async function StorePage() {
  const products = await getAllProducts()

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Culinary Store</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of professional-grade equipment, exclusive ingredients, and branded merchandise.
          </p>
        </div>

        {products.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-lg text-muted-foreground">
              No products available at the moment. Please check back later.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              // Default image if none provided
              const productImage = product.image || "https://images.unsplash.com/photo-1553484771-047a44eee27a"
              
              return (
                <Link key={product.id} href={`/store/${product.id}`}>
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    <div className="relative h-64">
                      <Image
                        src={productImage}
                        alt={product.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <Badge variant={product.inStock ? "default" : "destructive"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <Badge variant="secondary" className="mb-4">
                        {product.category}
                      </Badge>
                      {product.featured && (
                        <Badge variant="default" className="ml-2">
                          Featured
                        </Badge>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <span className="text-2xl font-bold">GH₵ {product.price.toFixed(2)}</span>
                      <Button disabled={!product.inStock}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}