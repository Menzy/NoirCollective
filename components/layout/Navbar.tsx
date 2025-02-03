"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChefHat, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartDrawer } from "@/components/store/CartDrawer"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recipes", label: "Recipes" },
    { href: "/store", label: "Store" },
    { href: "/blog", label: "Blog" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white dark:bg-black" : "bg-white dark:bg-black"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-black dark:text-white" />
            <span className="font-bold text-xl text-black dark:text-white">Noir Culinary</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <CartDrawer />
            <Button className="bg-black text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300">Book Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <CartDrawer />
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6 text-black dark:text-white" /> : <Menu className="h-6 w-6 text-black dark:text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="px-2 pt-2 pb-4 space-y-1 bg-white dark:bg-black">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button className="w-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-300">Book Now</Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar