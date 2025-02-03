import { getAllPosts, getPostBySlug } from "@/lib/notion"
import { notFound } from "next/navigation"
import BlogPost from "@/components/blog/BlogPost"

export const revalidate = 3600 // Revalidate every hour

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts()
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getPostBySlug(params.slug)

    if (!post) {
      notFound()
    }

    return (
      <div className="min-h-screen py-24">
        <article className="container mx-auto px-4 max-w-4xl">
          <BlogPost post={post} />
        </article>
      </div>
    )
  } catch (error) {
    console.error("Error fetching blog post:", error)
    notFound()
  }
}