import HeroSection from "@/components/home/HeroSection"
import LogoTicker from "@/components/home/LogoTicker"
import HighlightedRecipes from "@/components/home/HighlightedRecipes"
import ContactSection from "@/components/home/ContactSection"

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoTicker />
      <HighlightedRecipes />
      <ContactSection />
    </>
  )
}