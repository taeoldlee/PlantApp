import { Button } from "../components/ui/button"
import { Leaf, Sprout, MessageCircle, Droplets, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Super Simple Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sprout className="h-8 w-8 text-green-600" />
          <h1 className="text-2xl font-bold text-green-800">PlantPals</h1>
        </div>
        <div className="flex gap-4">
          <Link to="/about">
            <Button className="bg-green-600 hover:bg-green-700 text-white text-lg rounded-full">
              For Grown-ups
            </Button>
          </Link>
        </div>
      </header>

      {/* Big, Simple Hero */}
      <section className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Grow Your Own Plant Friend!</h2>

        <div className="flex justify-center my-8">
          <div className="relative w-64 h-64 bg-green-200 rounded-full overflow-hidden">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <img src="/placeholder.svg?height=250&width=250" alt="Happy plant character" className="w-56" />
            </div>
          </div>
        </div>

        <Button className="bg-green-600 hover:bg-green-700 text-white text-xl px-8 py-6 rounded-full animate-bounce">
          Let's Start!
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>

      {/* Super Simple Steps */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard
              number="1"
              icon={<Leaf className="h-12 w-12 text-green-600" />}
              title="Pick a Plant"
              description="Find your perfect plant friend!"
            />
            <StepCard
              number="2"
              icon={<MessageCircle className="h-12 w-12 text-green-600" />}
              title="Chat With It"
              description="Your plant will talk to you!"
            />
            <StepCard
              number="3"
              icon={<Droplets className="h-12 w-12 text-green-600" />}
              title="Help It Grow"
              description="Water it when it's thirsty!"
            />
          </div>
        </div>
      </section>

      {/* Simple Preview */}
      <section className="container mx-auto px-4 py-12 mb-12">
        <div className="bg-green-100 rounded-3xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Meet Your Plant Friends!</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <PlantFriend name="Sunny" type="Sunflower" color="yellow" />
              <PlantFriend name="Rosie" type="Rose" color="pink" />
              <PlantFriend name="Basil" type="Basil" color="green" />
              <PlantFriend name="Cactus" type="Cactus" color="teal" />
            </div>

            <Button className="bg-green-600 hover:bg-green-700 text-white text-xl px-8 py-6 rounded-full">
              Find Your Plant Friend Now!
            </Button>
          </div>
        </div>
      </section>

      {/* Super Simple Footer */}
      <footer className="bg-green-800 text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="h-8 w-8 text-green-400" />
            <h2 className="text-2xl font-bold">PlantPals</h2>
          </div>
          <p className="text-green-300">
            For Parents:{" "}
            <Link to="#" className="underline">
              Click Here
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}

function StepCard({ number, icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center bg-green-50 p-6 rounded-xl">
      <div className="text-2xl font-bold text-white bg-green-600 w-10 h-10 rounded-full flex items-center justify-center mb-4">
        {number}
      </div>
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-green-800 mb-2">{title}</h3>
      <p className="text-green-700 text-lg">{description}</p>
    </div>
  )
}

function PlantFriend({ name, type, color }) {
  const bgColor = {
    yellow: "bg-yellow-200",
    pink: "bg-pink-200",
    green: "bg-green-200",
    teal: "bg-teal-200",
  }[color]

  const textColor = {
    yellow: "text-yellow-800",
    pink: "text-pink-800",
    green: "text-green-800",
    teal: "text-teal-800",
  }[color]

  return (
    <div className="flex flex-col items-center">
      <div className={`w-20 h-20 ${bgColor} rounded-full flex items-center justify-center mb-2`}>
        <Sprout className={`h-10 w-10 ${textColor}`} />
      </div>
      <h3 className="font-bold text-lg text-green-800">{name}</h3>
      <p className="text-green-700">{type}</p>
    </div>
  )
}

