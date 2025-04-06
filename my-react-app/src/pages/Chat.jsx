import { useState } from "react"
import { Button } from "../components/ui/button"
import { Sprout, Send, ArrowLeft } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import sunflower from "../assets/sunflower.png"
import tomato from "../assets/tomato.png"
import rose from "../assets/rose.png"
import cactus from "../assets/cactus.png"
import lily from "../assets/lily.png"

const plantStyles = {
  sunny: {
    bg: "bg-yellow-100",
    accent: "bg-yellow-400",
    text: "text-yellow-800",
    border: "border-yellow-400",
    image: sunflower,
    greeting: "Hi friend! I'm Sunny! ☀️ I love bright days and growing tall! What shall we talk about?",
    hover: "hover:bg-yellow-300"
  },
  tomato: {
    bg: "bg-red-100",
    accent: "bg-red-400",
    text: "text-red-800",
    border: "border-red-400",
    image: tomato,
    greeting: "Hey there! I'm Tommy! 🍅 I'm excited to grow yummy tomatoes with you! What's on your mind?",
    hover: "hover:bg-red-300"
  },
  rosy: {
    bg: "bg-pink-100",
    accent: "bg-pink-400",
    text: "text-pink-800",
    border: "border-pink-400",
    image: rose,
    greeting: "Hello! I'm Rosie! 🌹 I love sharing pretty stories! What would you like to talk about?",
    hover: "hover:bg-pink-300"
  },
  hardy: {
    bg: "bg-teal-100",
    accent: "bg-teal-400",
    text: "text-teal-800",
    border: "border-teal-400",
    image: cactus,
    greeting: "Hi! I'm Spike! 🌵 I'm tough but friendly! What's up?",
    hover: "hover:bg-teal-300"
  },
  leafy: {
    bg: "bg-green-100",
    accent: "bg-green-400",
    text: "text-green-800",
    border: "border-green-400",
    image: lily,
    greeting: "Hello friend! I'm Lily! 🌿 I'm here to help you feel peaceful! What would you like to chat about?",
    hover: "hover:bg-green-300"
  },
}

export default function Chat() {
  const location = useLocation()
  const plantType = location.state?.plantType || "sunny" // default to sunny if no type passed
  const plant = plantStyles[plantType]

  const [messages, setMessages] = useState([
    { sender: "plant", text: plant.greeting }
  ])
  const [inputText, setInputText] = useState("")

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text: inputText }])
    setInputText("")

    // Simulate plant response (replace with actual AI response later)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: "plant", 
        text: "That's interesting! Tell me more about it! 😊" 
      }])
    }, 1000)
  }

  return (
    <div className={`min-h-screen ${plant.bg}`}>
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sprout className="h-10 w-10 text-green-600" />
          <Link to="/">
            <h1 className="text-3xl font-bold text-green-800 hover:text-green-400">PlantPals</h1>
          </Link>
        </div>
        <Link to="/quiz">
          <Button 
            className={`text-xl rounded-full px-6 ${plant.accent} ${plant.hover}`}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            New Friend
          </Button>
        </Link>
      </header>

      {/* Chat Container */}
      <main className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Plant Profile */}
          <div className={`${plant.accent} p-6 flex items-center gap-4`}>
            <div className="w-20 h-20 rounded-full overflow-hidden bg-white p-2">
              <img 
                src={plant.image} 
                alt="Plant character" 
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold text-white">
              Chat with {plantType === "sunny" ? "Sunny" : 
                        plantType === "tomato" ? "Tommy" :
                        plantType === "rosy" ? "Rosie" :
                        plantType === "hardy" ? "Spike" : "Lily"}
            </h2>
          </div>

          {/* Messages Area */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                    max-w-[80%] rounded-2xl p-4 
                    ${message.sender === "user" 
                      ? "bg-blue-500 text-white rounded-br-none"
                      : `${plant.bg} ${plant.text} rounded-bl-none`
                    }
                  `}
                >
                  <p className="text-xl">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                className={`
                  flex-1 rounded-full px-6 py-3 text-xl
                  border-2 ${plant.border} focus:outline-none
                  focus:ring-2 focus:ring-offset-2 ${plant.accent}
                `}
              />
              <Button 
                type="submit"
                className={`rounded-full ${plant.accent} ${plant.hover}`}
              >
                <Send className="h-8 w-8" />
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
