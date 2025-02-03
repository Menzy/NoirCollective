"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const logos = [
  { name: "Food & Wine", url: "https://example.com/food-and-wine.svg" },
  { name: "Michelin Guide", url: "https://example.com/michelin.svg" },
  { name: "Bon Appétit", url: "https://example.com/bon-appetit.svg" },
  { name: "James Beard Foundation", url: "https://example.com/james-beard.svg" },
  { name: "Saveur", url: "https://example.com/saveur.svg" },
]

const LogoTicker = () => {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-semibold mb-12">
          Featured In
        </h2>
        <motion.div
          className="flex justify-around items-center flex-wrap gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-semibold">{logo.name}</h3>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default LogoTicker