import { getAllPosts } from "@/lib/notion"
import BlogList from "@/components/blog/BlogList"
import { Card } from "@/components/ui/card"

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  try {
    const posts = await getAllPosts()

    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover culinary insights, techniques, and stories from our kitchen.
            </p>
          </div>

          {posts.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-lg text-muted-foreground">
                No blog posts available at the moment. Please check back later for new content.
              </p>
            </Card>
          ) : (
            <BlogList posts={posts} />
          )}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Unable to Load Blog Posts</h2>
            <p className="text-lg text-muted-foreground">
              We're having trouble loading the blog posts. Please try again later.
            </p>
          </Card>
        </div>
      </div>
    )
  }
}