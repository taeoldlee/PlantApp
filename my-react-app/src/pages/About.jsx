import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-8">
      <h1 className="text-4xl font-bold text-green-800">About PlantPals</h1>
      <Link to="/">
        <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
          Back to Home
        </Button>
      </Link>
    </div>
  )
}