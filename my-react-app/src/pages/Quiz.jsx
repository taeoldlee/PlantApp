import { useState } from "react"
import { Button } from "../components/ui/button"
import { Sprout, Sun, Cloud, Droplets } from "lucide-react"
import { Link } from "react-router-dom"
import sunflower from "../assets/sunflower.png"
import tomato from "../assets/tomato.png"
import rose from "../assets/rose.png"
import cactus from "../assets/cactus.png"
import lily from "../assets/lily.png"


const questions = [
  {
    id: 1,
    question: "What's your favorite color?",
    options: [
      { text: "Bright Yellow", value: "sunny", icon: "🌟" },
      { text: "Pretty Pink", value: "rosy", icon: "💖" },
      { text: "Cool Blue", value: "leafy", icon: "💧" },
      { text: "Green", value: "hardy", icon: "🌿" },
      { text: "Red", value: "tomato", icon: "🍅" },
    ],
  },
  {
    id: 2,
    question: "Where do you like to play?",
    options: [
      { text: "Sunny Window", value: "sunny", icon: "🪟" },
      { text: "Cozy Corner", value: "rosy", icon: "🛋️" },
      { text: "Garden Outside", value: "leafy", icon: "🌳" },
      { text: "Kitchen Counter", value: "hardy", icon: "🏠" },
      { text: "Vegetable Patch", value: "tomato", icon: "🥬" },
    ],
  },
  {
    id: 3,
    question: "What's your favorite thing to do?",
    options: [
      { text: "Dance in the Sun", value: "sunny", icon: "💃" },
      { text: "Make Food", value: "tomato", icon: "👩‍🍳" },
      { text: "Read Books", value: "leafy", icon: "📚" },
      { text: "Draw Pictures", value: "rosy", icon: "🎨" },
      { text: "Play Outside", value: "hardy", icon: "⚽" },
    ],
  },
  {
    id: 4,
    question: "How often do you want to water your plant?",
    options: [
      { text: "Every Day!", value: "sunny", icon: "💧" },
      { text: "Sometimes", value: "rosy", icon: "💧💧" },
      { text: "Not Much", value: "leafy", icon: "💧💧💧" },
      { text: "Almost Never", value: "hardy", icon: "🌵" },
      { text: "When I Remember", value: "tomato", icon: "🤔" },
    ],
  },
]

const results = {
  sunny: {
    name: "Sunny the Sunflower",
    description: "A bright and cheerful friend who loves to play in the sunshine! Sunny will grow tall and strong with you.",
    image: sunflower,
  },
  rosy: {
    name: "Rosie the Rose",
    description: "A sweet and lovely friend who brings color to every day! Rosie loves to share beautiful stories.",
    image: rose,
  },
  leafy: {
    name: "Lily the Peace Lily",
    description: "A calm and peaceful friend who helps you relax! Lily is great at keeping secrets.",
    image: lily,
  },
  hardy: {
    name: "Spike the Cactus",
    description: "A tough little friend who's always there for you! Spike doesn't need much water to stay happy.",
    image: cactus,
  },
  tomato: {
    name: "Tommy the Tomato",
    description: "A fun and tasty friend who loves to grow yummy snacks! Tommy will teach you all about healthy eating.",
    image: tomato,
  },
}

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)
  const [plantType, setPlantType] = useState(null)

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate most frequent answer
      const frequency = {}
      let maxFreq = 0
      let mostFrequent = 'hardy' // default

      newAnswers.forEach(value => {
        frequency[value] = (frequency[value] || 0) + 1
        if (frequency[value] > maxFreq) {
          maxFreq = frequency[value]
          mostFrequent = value
        }
      })

      setPlantType(mostFrequent)
      setResult(results[mostFrequent])
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
    setPlantType(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-green-50">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sprout className="h-10 w-10 text-green-600" />
          <Link to="/">
            <h1 className="text-3xl font-bold text-green-800 hover:text-green-400">PlantPals</h1>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!result ? (
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-4xl text-center font-bold text-green-800 mb-8">
                Find Your Perfect Plant Friend!
              </h2>
              
              <div className="text-center mb-8">
                <p className="text-2xl text-green-700">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>

              <h3 className="text-3xl text-center font-bold text-green-800 mb-8">
                {questions[currentQuestion].question}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`
                      bg-green-50 p-6 rounded-xl text-center 
                      transition-all duration-300 hover:scale-105 hover:shadow-lg
                      ${questions[currentQuestion].options.length === 5}
                    `}
                  >
                    <span className="text-4xl mb-4 block">{option.icon}</span>
                    <span className="text-xl font-bold text-green-800">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
              <h2 className="text-4xl font-bold text-green-800 mb-4">
                We Found Your Plant Friend!
              </h2>
              
              <div className="w-48 h-48 mx-auto bg-green-100 rounded-full mb-6 overflow-hidden">
                <img 
                  src={result.image} 
                  alt={result.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              <h3 className="text-3xl font-bold text-green-800 mb-4">
                {result.name}
              </h3>
              
              <p className="text-xl text-green-700 mb-8">
                {result.description}
              </p>

              <div className="space-y-4">
                <Link 
                  to="/chat" 
                  state={{ plantType: plantType }}
                >
                  <Button className="text-2xl px-8 py-4 rounded-full">
                    Start Chatting!
                  </Button>
                </Link>
                
                <button
                  onClick={resetQuiz}
                  className="block w-full text-green-600 underline text-lg"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
