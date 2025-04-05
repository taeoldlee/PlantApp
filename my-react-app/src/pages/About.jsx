import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Leaf, Sprout, MessageCircle, Droplets, ArrowRight } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
      <h1 className="text-4xl font-bold text-green-800">About PlantPals</h1>
      <Link to="/">
        <Button>
          Back to Home
        </Button>
      </Link>
    </div>
  )
}