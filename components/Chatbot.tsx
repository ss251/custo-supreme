"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const botResponses = {
  greeting: "Hello! How can I assist you with our commercial cleaning services in Chattanooga today?",
  services: "We offer a range of commercial cleaning services including office cleaning, medical facility cleaning, industrial cleaning, and more. Which service are you interested in?",
  booking: "To book a cleaning service, please use the 'Get a Free Quote' button at the top of the page or call us at (123) 456-7890.",
  pricing: "Our pricing varies depending on the size of your commercial space and the type of service you need. For a detailed quote, please use our booking form or contact us directly.",
  default: "I'm sorry, I didn't understand that. Could you please rephrase or choose from our common topics: services, booking, or pricing?"
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: botResponses.greeting, isBot: true }]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');

    // Simple bot logic
    let botReply;
    if (input.toLowerCase().includes('service')) {
      botReply = botResponses.services;
    } else if (input.toLowerCase().includes('book')) {
      botReply = botResponses.booking;
    } else if (input.toLowerCase().includes('price') || input.toLowerCase().includes('cost')) {
      botReply = botResponses.pricing;
    } else {
      botReply = botResponses.default;
    }

    setTimeout(() => {
      setMessages(msgs => [...msgs, { text: botReply, isBot: true }]);
    }, 500);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-4 right-4 bg-primary text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50"
          >
            <div className="bg-primary text-white p-4">
              <h3 className="font-bold">CustoSupreme Support</h3>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.isBot ? 'bg-muted' : 'bg-primary text-white'
                  } p-2 rounded-lg ${message.isBot ? 'rounded-tl-none' : 'rounded-tr-none'} ${
                    message.isBot ? 'mr-12' : 'ml-12'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}