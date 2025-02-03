import Link from "next/link"
import { ChefHat, Instagram, Twitter, Facebook, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8" />
              <span className="font-bold text-xl">Noir Culinary</span>
            </Link>
            <p className="text-muted-foreground">
              Elevating culinary experiences through artistry and innovation.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://www.instagram.com/allofjc/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/recipes" className="text-muted-foreground hover:text-foreground">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-foreground">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>contact@noirculinary.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Culinary Street</li>
              <li>New York, NY 10001</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get the latest recipes and culinary insights.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md border bg-background"
              />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Noir Culinary Collective. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer