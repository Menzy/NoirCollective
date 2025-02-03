"use client"

import { motion } from "framer-motion"
import { format } from "date-fns"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import type { BlogPost } from "@/lib/notion"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface BlogPostProps {
  post: BlogPost
}

export default function BlogPost({ post }: BlogPostProps) {
  const markdownContent = typeof post.content === 'string' ? post.content : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="overflow-hidden bg-background">
        {post.coverImage && (
          <div className="relative h-[400px]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="px-4 md:px-8 py-8 md:py-12">
          <header className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <time className="text-muted-foreground">
              {format(new Date(post.date), "MMMM dd, yyyy")}
            </time>
            {post.excerpt && (
              <>
                <Separator className="my-6" />
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  {post.excerpt}
                </p>
              </>
            )}
          </header>
          
          <Separator className="my-8" />
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
                p: ({ children, node }) => {
                  // Check if the paragraph contains only an image
                  const hasOnlyImage = node.children.length === 1 && node.children[0].type === 'image'
                  return hasOnlyImage ? <>{children}</> : <p className="mb-4 leading-relaxed">{children}</p>
                },
                ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                li: ({ children }) => <li className="mb-2">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                    {children}
                  </pre>
                ),
                img: ({ src, alt }) => (
                  <div className="my-8">
                    <div className="relative h-[400px]">
                      <Image
                        src={src || ''}
                        alt={alt || ''}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                ),
              }}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}