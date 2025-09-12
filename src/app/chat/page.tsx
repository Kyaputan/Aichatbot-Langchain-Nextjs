'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import MessageList from '@/components/ChatArea/MessageList'
import ChatInput from '@/components/ChatArea/ChatInput'
import { useState, useEffect } from 'react'
import { LogoutButton } from '@/components/logout-button'
import { createClient } from '@/lib/client'
import { User } from '@supabase/supabase-js'

export default function Chat() {
    const [user, setUser] = useState<User | null>(null)
    const [displayName, setDisplayName] = useState<string>('')
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat'
        })
    })

    // ดึงข้อมูล user เมื่อ component mount
useEffect(() => {
    const supabase = createClient()

    // ดึงข้อมูล user ปัจจุบัน
    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            setUser(user)
            // ดึง display_name จาก user metadata
            const displayNameFromMeta = user.user_metadata?.display_name || user.email?.split('@')[0] || 'User'
            setDisplayName(displayNameFromMeta)
        }
    }

    getUser()

    // Listen สำหรับการเปลี่ยนแปลง auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
            setUser(session.user)
            const displayNameFromMeta = session.user.user_metadata?.display_name || session.user.email?.split('@')[0] || 'User'
            setDisplayName(displayNameFromMeta)
        } else {
            setUser(null)
            setDisplayName('')
        }
    })

    return () => subscription.unsubscribe()
}, [])

    return (

        <div className="flex flex-col h-screen bg-gray-100">
            <div className="bg-white shadow-sm p-4 border-b">
                <h1 className="text-xl font-semibold text-gray-800 text-center">Genius AI Chatbot</h1>
                <div className="absolute top-4 right-4 flex items-center gap-3">
                    {displayName && (
                        <div className="text-sm text-gray-600">
                            <span className="hidden sm:inline">สวัสดี, </span>
                            <span className="font-medium text-gray-800">{displayName}</span>
                        </div>
                    )}
                    <LogoutButton />
                </div>
            </div>
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