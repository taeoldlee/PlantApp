import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Leaf, Sprout, MessageCircle, Droplets, ArrowRight } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sprout className="h-10 w-10 text-green-600" />
          <Link to="/">
            <h1 className="text-3xl font-bold text-green-800 hover:text-green-400">PlantPals</h1>
          </Link>
        </div>
        <Link to="/">
          <Button className="text-2xl rounded-full px-6">
            Back to Home
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <section className="w-full px-4 py-8 text-center bg-green-50">
        <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-8">For Parents & Teachers</h2>
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-green-800 mb-6">About PlantPals</h3>
          <div className="text-xl text-green-700 space-y-6 ">
            <p>
              At PlantPals, we believe in growing more than just plants—we're here to grow curiosity, care, and connection between kids and the natural world.
            </p>
            <p>
            In a time when plastic waste is piling up and rapid entertainment is taking center stage, PlantPals was born from a deep concern for our environment and for the next generation. We're on a mission to reconnect children with nature, reduce plastic waste in toys, and inspire a lifelong appreciation for the planet.
            </p>
          </div>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl mt-10">
          <h3 className="text-3xl font-bold text-green-800 mb-6">Our First Step: The PlantPal1</h3>
          <div className="text-xl text-green-700 space-y-6">
            <p>
             The PlantPal1 is our first product, and it’s more than just a smart sensor. It’s a tiny friend for your child and a high-tech helper for your houseplants. Once placed in the soil, the PlantPal1 reads real-time data like moisture, temperature, sunlight, and humidity to monitor the plant’s health and lifecycle.            </p>
            <p>
              But what makes it truly magical? </p>
            <p>
              The plant talks back. </p>
            <p>
              Using our interactive AI-powered app, your child can chat directly with their plant, just like a modern-day Tamagotchi—but greener. As the plant shares its needs, moods, and stories, kids learn hands-on plant science in a way that’s personal, fun, and unforgettable.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-lime-500 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={<Leaf className="h-12 w-12 text-green-600" />}
              title="Educational"
              description="Learn about plant biology and care through fun interactions"
            />
            <FeatureCard
              icon={<MessageCircle className="h-12 w-12 text-green-600" />}
              title="Interactive"
              description="AI-powered plant friends that respond to care and attention"
            />
            <FeatureCard
              icon={<Droplets className="h-12 w-12 text-green-600" />}
              title="Responsible"
              description="Develop daily routines and caring habits"
            />
          </div>
        </div>
      </section>

      <section className="w-full px-4 py-8 text-center bg-green-50">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
          <h3 className="text-3xl font-bold text-green-800 mb-6">Why It Matters</h3>
          <div className="text-xl text-green-700 space-y-6 ">
            <p>
              Plastic toys break. PlantPals build.            </p>
            <p>
              We’re designing experiences that help kids care for their environment, for living things, and for their own role in the future of our planet. We use eco-conscious materials, digital learning, and the power of storytelling to plant seeds of environmental awareness that will grow with every child.            </p>
            <p>
              Join us as we nurture a generation of young Earth stewards—one PlantPal at a time.
            </p>
          </div>
        </div>
        
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-12 mb-12">
        <div className="bg-green-100 rounded-3xl p-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Get In Touch</h2>
          <p className="text-xl text-green-700 mb-8">
            Have questions? We'd love to hear from you!
          </p>
          <Button className="text-2xl px-8 py-4 rounded-full">
            Contact Us
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="h-8 w-8 text-green-400" />
            <h2 className="text-2xl font-bold">PlantPals</h2>
          </div>
          <p className="text-green-300">
            &copy; 2025 PlantPals. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center bg-green-50 p-6 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.05] hover:shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-green-800 mb-2">{title}</h3>
      <p className="text-green-700 text-lg">{description}</p>
    </div>
  )
}