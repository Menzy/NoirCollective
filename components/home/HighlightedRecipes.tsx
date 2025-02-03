"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users } from "lucide-react"

const recipes = [
  {
    title: "Truffle Infused Risotto",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826a07c",
    time: "45 mins",
    servings: "4",
    difficulty: "Medium",
  },
  {
    title: "Sous Vide Duck Breast",
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24",
    time: "2 hours",
    servings: "2",
    difficulty: "Advanced",
  },
  {
    title: "Chocolate Soufflé",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    time: "30 mins",
    servings: "2",
    difficulty: "Advanced",
  },
]

const HighlightedRecipes = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Recipes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular recipes, crafted with precision and passion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{recipe.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      {recipe.time}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      {recipe.servings} servings
                    </div>
                  </div>
                  <Button className="w-full">View Recipe</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline">
            View All Recipes
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default HighlightedRecipes