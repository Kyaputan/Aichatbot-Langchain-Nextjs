'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import MessageList from '@/components/ChatArea/MessageList'
import ChatInput from '@/components/ChatArea/ChatInput'


export default function Chat() {
    // ใช้ useChat hook เพื่อจัดการสถานะการสนทนา
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat'
        })
    })

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Chat Messages Area */}
            <MessageList messages={messages} />

            {/* Input Area */}
            <ChatInput 
                onSendMessage={sendMessage}
                status={status}
            />
        </div>
    )
}