"use client"

import { motion } from "framer-motion"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { BlogPost } from "@/lib/notion"

interface BlogListProps {
  posts: BlogPost[]
}

export default function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No blog posts found. Check back soon for new content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={`/blog/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              {post.coverImage && (
                <div className="relative h-48">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                  {format(new Date(post.date), "MMMM dd, yyyy")}
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}