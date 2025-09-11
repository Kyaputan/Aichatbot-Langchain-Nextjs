'use client'
import { Chat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useState } from "react"

const ChatPage = () => {

    const [messages, setMessages] = useState("")



    return (
        <>
            <form action="">
                <input type="text" value={messages} onChange={(e) => setMessages(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </>
    )
}

export default ChatPage
