import { useState, useEffect, useRef } from "react"
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
  const plantType = location.state?.plantType || "sunny"
  const plant = plantStyles[plantType]
  const fetchingRef = useRef(false)
  
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")
  const [sessionId, setSessionId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messageCount, setMessageCount] = useState(0)
  const [showDeliveryPrompt, setShowDeliveryPrompt] = useState(false)
  const [showDeliveryModal, setShowDeliveryModal] = useState(false)
  const [deliveryComplete, setDeliveryComplete] = useState(false)
  const [postDeliveryMessageCount, setPostDeliveryMessageCount] = useState(0)

  const getPlantName = (type) => {
    const names = {
      sunny: "Sunny",
      tomato: "Tommy",
      rosy: "Rosie",
      hardy: "Spike",
      leafy: "Lily"
    }
    return names[type]
  }

  const fetchIntroduction = async (abortController) => {
    if (fetchingRef.current) return
    fetchingRef.current = true

    setIsLoading(true)
    setMessages([])
    
    try {
      const response = await fetch('https://plantapp-z7dw.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({
          plant_type: plantType,
          plant_name: getPlantName(plantType),
          user_message: "Hi! Please introduce yourself once.",
          session_id: null
        }),
        signal: abortController.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (!abortController.signal.aborted) {
        if (data.error) {
          console.error('Chat error:', data.error)
          setMessages([{ 
            sender: "plant", 
            text: plantStyles[plantType].greeting
          }])
        } else {
          setSessionId(data.session_id)
          setMessages([{ 
            sender: "plant", 
            text: data.response 
          }])
        }
      }
    } catch (error) {
      if (!abortController.signal.aborted) {
        console.error('Network error:', error)
        setMessages([{ 
          sender: "plant", 
          text: plantStyles[plantType].greeting
        }])
      }
    } finally {
      if (!abortController.signal.aborted) {
        setIsLoading(false)
        fetchingRef.current = false
      }
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    fetchingRef.current = false
    fetchIntroduction(abortController)

    return () => {
      abortController.abort()
      fetchingRef.current = false
    }
  }, [plantType])

  const handleDeliverySubmit = async (address) => {
    setDeliveryComplete(true)
    setShowDeliveryModal(false)
    setIsLoading(true)
    
    // Add artificial delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setMessages(prev => [...prev, {
      sender: "plant",
      text: "Yay! I'm so excited to come live with you! I'll be there soon, and we can grow together in real life! 🌱✨"
    }])
    setIsLoading(false)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!inputText.trim() || isLoading) return

    const userMessage = inputText.trim()
    setMessages(prev => [...prev, { sender: "user", text: userMessage }])
    setInputText("")
    setIsLoading(true)
    setMessageCount(prev => prev + 1)

    // Handle the two special messages after delivery
    if (deliveryComplete && postDeliveryMessageCount < 2) {
      // Add artificial delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (postDeliveryMessageCount === 0) {
        setMessages(prev => [...prev, {
          sender: "plant",
          text: "I'm so happy to be here now! 🏡 But I'm feeling a little thirsty... could you water me? 💧"
        }])
        setPostDeliveryMessageCount(1)
      } else if (postDeliveryMessageCount === 1) {
        setMessages(prev => [...prev, {
          sender: "plant",
          text: "Ahhh, much better now! Thank you for watering me! 💚 I feel refreshed and ready to grow! 🌱"
        }])
        setPostDeliveryMessageCount(2)
      }
      setIsLoading(false)
      return
    }

    if (messageCount === 4 && !showDeliveryPrompt && !deliveryComplete) {
      setShowDeliveryPrompt(true)
    }

    // Create an AbortController for timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    try {
      const response = await fetch('https://plantapp-z7dw.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin,
        },
        body: JSON.stringify({
          plant_type: plantType,
          plant_name: getPlantName(plantType),
          user_message: userMessage,
          session_id: sessionId
        }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        console.error('Chat error:', data.error)
        setMessages(prev => [...prev, { 
          sender: "plant", 
          text: "Oops! I'm having trouble thinking right now. Can you try again?" 
        }])
      } else {
        setSessionId(data.session_id)
        setMessages(prev => [...prev, { 
          sender: "plant", 
          text: data.response 
        }])
        
        if (messageCount === 4 && !showDeliveryPrompt && !deliveryComplete) {
          setTimeout(() => {
            setMessages(prev => [...prev, {
              sender: "plant",
              text: "Hey friend! We've been chatting for a while now, and I really enjoy talking with you! Would you like to grow me in your home? We could be real-life plant pals! 🌱💚"
            }])
          }, 1000)
        }
      }
    } catch (error) {
      console.error('Network error:', error)
      const errorMessage = error.name === 'AbortError' 
        ? "Oops! I'm taking too long to respond. Please try again!"
        : "Oops! I'm having trouble connecting. Can you check your internet?"
      
      setMessages(prev => [...prev, { 
        sender: "plant", 
        text: errorMessage
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    const messageArea = document.querySelector('.message-area')
    if (messageArea) {
      messageArea.scrollTop = messageArea.scrollHeight
    }
  }, [messages])

  const DeliveryModal = () => (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 pointer-events-none">
      <div className={`bg-white rounded-3xl p-6 max-w-md w-full ${plant.text} shadow-xl pointer-events-auto transform transition-all duration-200 scale-100 hover:scale-[1.02]`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Get Your Plant Friend!</h3>
          <button 
            onClick={() => setShowDeliveryModal(false)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target)
          handleDeliverySubmit({
            name: formData.get('name'),
            address: formData.get('address'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip')
          })
        }}>
          <div className="space-y-4">
            <input
              name="name"
              placeholder="Your Name"
              className={`w-full rounded-full px-4 py-2 border-2 ${plant.border} text-lg focus:outline-none focus:ring-2`}
              required
            />
            <input
              name="address"
              placeholder="Street Address"
              className={`w-full rounded-full px-4 py-2 border-2 ${plant.border} text-lg focus:outline-none focus:ring-2`}
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                name="city"
                placeholder="City"
                className={`rounded-full px-4 py-2 border-2 ${plant.border} text-lg focus:outline-none focus:ring-2`}
                required
              />
              <input
                name="state"
                placeholder="State"
                className={`rounded-full px-4 py-2 border-2 ${plant.border} text-lg focus:outline-none focus:ring-2`}
                required
              />
            </div>
            <input
              name="zip"
              placeholder="ZIP Code"
              className={`w-full rounded-full px-4 py-2 border-2 ${plant.border} text-lg focus:outline-none focus:ring-2`}
              required
            />
          </div>
          <div className="flex gap-2 mt-6">
            <Button
              type="button"
              onClick={() => setShowDeliveryModal(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-black rounded-full"
            >
              Maybe Later
            </Button>
            <Button
              type="submit"
              className={`flex-1 ${plant.accent} ${plant.hover} rounded-full`}
            >
              Get My Plant! 🌱
            </Button>
          </div>
        </form>
      </div>
    </div>
  )

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
            <div className="flex items-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            New Friend
            </div>
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
          <div className="h-[400px] overflow-y-auto p-6 space-y-4 message-area">
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
                  {showDeliveryPrompt && 
                   index === messages.length - 1 && 
                   message.sender === "plant" && 
                   !deliveryComplete && 
                   message.text.includes("Would you like to grow me in your home?") && (
                    <Button
                      onClick={() => setShowDeliveryModal(true)}
                      className={`mt-4 ${plant.accent} ${plant.hover} rounded-full text-white`}
                    >
                      Yes, I want to grow you! 🌱
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`${plant.bg} ${plant.text} rounded-2xl p-4 rounded-bl-none`}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-current animate-bounce" />
                    <div className="w-3 h-3 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                    <div className="w-3 h-3 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area - disabled while loading */}
          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message here..."
                disabled={isLoading}
                className={`
                  flex-1 rounded-full px-6 py-3 text-xl
                  border-2 ${plant.border} focus:outline-none
                  focus:ring-2 focus:ring-offset-2 ${plant.accent}
                  ${isLoading ? 'opacity-50' : ''}
                `}
              />
              <Button 
                type="submit"
                disabled={isLoading}
                className={`rounded-full ${plant.accent} ${plant.hover} ${isLoading ? 'opacity-50' : ''}`}
              >
                <Send className="h-8 w-8" />
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Delivery Modal */}
      {showDeliveryModal && <DeliveryModal />}
    </div>
  )
}
