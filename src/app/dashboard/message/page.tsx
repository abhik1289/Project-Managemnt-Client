'use client'

import { useState, useRef, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Image, Send } from "lucide-react"

type Message = {
  id: number
  sender: string
  content: string
  timestamp: string
  isImage: boolean
  mentions: string[]
}

type Member = {
  id: number
  name: string
  avatar: string
}

export default function GroupChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Alice', content: 'Has anyone encountered issues with the login feature?', timestamp: '10:30 AM', isImage: false, mentions: [] },
    { id: 2, sender: 'Bob', content: 'Yes, I\'m seeing a 404 error. Here\'s a screenshot:', timestamp: '10:32 AM', isImage: false, mentions: [] },
    { id: 3, sender: 'Bob', content: '/placeholder.svg?height=300&width=400', timestamp: '10:32 AM', isImage: true, mentions: [] },
    { id: 4, sender: 'Charlie', content: '@Bob I\'ll look into it. Can you provide more details about when this occurs?', timestamp: '10:35 AM', isImage: false, mentions: ['Bob'] },
  ])

  const members: Member[] = [
    { id: 1, name: 'Alice', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 2, name: 'Bob', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 3, name: 'Charlie', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 4, name: 'David', avatar: '/placeholder.svg?height=40&width=40' },
    { id: 5, name: 'Eva', avatar: '/placeholder.svg?height=40&width=40' },
  ]

  const [newMessage, setNewMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messageRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const mentions = newMessage.match(/@(\w+)/g)?.map(mention => mention.slice(1)) || []
      const newMsg: Message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isImage: false,
        mentions
      }
      setMessages([...messages, newMsg])
      setNewMessage('')
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newMsg: Message = {
          id: messages.length + 1,
          sender: 'You',
          content: e.target?.result as string,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isImage: true,
          mentions: []
        }
        setMessages([...messages, newMsg])
      }
      reader.readAsDataURL(file)
    }
  }

  const scrollToMessage = (id: number) => {
    const messageElement = messageRefs.current[id]
    if (messageElement && scrollAreaRef.current) {
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const highlightMentions = (content: string) => {
    const parts = content.split(/(@\w+)/)
    return parts.map((part, index) => 
      part.startsWith('@') ? 
        <span key={index} className="text-blue-500 font-semibold cursor-pointer" onClick={() => scrollToMessage(messages.findIndex(m => m.sender === part.slice(1)) + 1)}>{part}</span> : 
        part
    )
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex h-[600px] max-w-4xl mx-auto">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>Group Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 h-max-[700px]">
          <div className="flex-1 px-4 h-max-[700px]" >
            <div className="pb-4 h-[450px] overflow-y-auto px-3">
              {messages.map((message) => (
                <div key={message.id} className="mb-4" >
                  <div className="flex items-start">
                    <Avatar className="w-8 h-8 mr-2">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${message.sender.charAt(0)}`} />
                      <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{message.sender}</div>
                      {message.isImage ? (
                        <img src={message.content} alt="Shared screenshot" className="max-w-sm rounded-lg shadow-md" />
                      ) : (
                        <div className="text-sm">{highlightMentions(message.content)}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 ml-10">{message.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-background border-t">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message... Use @ to mention"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
              <label htmlFor="image-upload">
                <Button size="icon" variant="outline" className="cursor-pointer" asChild>
                  <div>
                    <Image className="h-4 w-4" />
                    <span className="sr-only">Upload image</span>
                  </div>
                </Button>
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-64 ml-4">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>{member.name}</div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}