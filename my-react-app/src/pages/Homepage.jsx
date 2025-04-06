import { Button } from "../components/ui/button"
import { Leaf, Sprout, MessageCircle, Droplets, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { HashLink } from 'react-router-hash-link';
import sunflower from "../assets/sunflower.png"
import tomato from "../assets/tomato.png"
import rose from "../assets/rose.png"
import cactus from "../assets/cactus.png"
import lily from "../assets/lily.png"


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Super Simple Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sprout className="h-10 w-10 text-green-600" />
          <Link to="/">
          <h1 className="text-3xl font-bold text-green-800 hover:text-green-400">PlantPals</h1>
          </Link>
        </div>
        <div className="flex gap-4">
          <Link to="/about">
            <Button className="text-2xl rounded-full px-6">
              For Grown-ups
            </Button>
          </Link>
        </div>
      </header>

      {/* Big, Simple Hero */}
      <section className="w-full px-4 py-8 text-center bg-sky-300">
        <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Grow Your Own Plant Friend!</h2>

        <div className="flex justify-center my-8">
          <div className="relative w-64 h-64 bg-green-200 rounded-full overflow-hidden">
              <img src={sunflower} className="w-[85%] mx-auto block" />
          </div>
        </div>

        <Link to="/quiz">
          <Button className="text-3xl px-8 rounded-full animate-bounce">
            <div className="flex items-center">
              Let's Start! <ArrowRight className="ml-2 h-5 w-5" />
            </div>
          </Button>
        </Link>
      </section>

      {/* Super Simple Steps */}
      <section className="bg-lime-500 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StepCard
              number="1"
              icon={<Leaf className="h-12 w-12 text-green-600" />}
              title="Pick a Plant!"
            />
            <StepCard
              number="2"
              icon={<MessageCircle className="h-12 w-12 text-green-600" />}
              title="Chat With It!"
            />
            <StepCard
              number="3"
              icon={<Droplets className="h-12 w-12 text-green-600" />}
              title="Help It Grow!"
            />
          </div>
        </div>
      </section>

      {/* Simple Preview */}
      <section className="container mx-auto px-4 py-12 mb-12">
        <div className="bg-green-100 rounded-3xl p-8 max-w-4xl mx-auto transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl font-bold text-green-800 mb-6">Meet Your Plant Friends!</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <PlantFriend name="Tommy" type="Tomato" color="blue" />
              <PlantFriend name="Rosie" type="Rose" color="pink" />
              <PlantFriend name="Lily" type="Lily" color="green" />
              <PlantFriend name="Spike" type="Cactus" color="teal" />
            </div>
          <Link to="/quiz">
            <Button className="bg-green-600 hover:bg-green-700 text-white text-3xl px-8 py-6 rounded-full">
              Find Your Plant Friend Now!
            </Button>
          </Link>
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
            <HashLink to="/about#top" className="underline">
              Click Here
            </HashLink>
          </p>
          <p className="text-green-300">
            &copy; 2025 PlantPals. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function StepCard({ number, icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center bg-green-50 p-6 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.05] hover:shadow-lg">
      <div className="text-2xl font-bold text-white bg-green-600 w-10 h-10 rounded-full flex items-center justify-center mb-4">
        {number}
      </div>
      <div className="mb-4">{icon}</div>
      <h3 className="text-4xl font-bold text-green-800 mb-2">{title}</h3>
      <p className="text-green-700 text-lg">{description}</p>
    </div>
  )
}

function PlantFriend({ name, type, color }) {
  const bgColor = {
    blue: "bg-blue-200",
    pink: "bg-pink-200",
    green: "bg-green-200",
    teal: "bg-teal-200",
  }[color]

  const image = {
    blue: tomato,
    pink: rose,
    green: lily,
    teal: cactus,
  }[color]

  return (
    <div className="flex flex-col items-center">
      <div className={`w-40 h-40 ${bgColor} rounded-full flex items-center justify-center mb-2 overflow-clip`}>
        <img src={image} className="w-full object-contain p-2" />
      </div>
      <h3 className="font-bold text-3xl text-green-800">{name}</h3>
    </div>
  )
}

