// components/MessageList/MessageList.jsx
import ChatArea from '@/components/ChatArea/ChatArea'
import { UIMessage } from '@ai-sdk/react'

export default function MessageList({ messages } : { messages: UIMessage[] }) {
    return (
        <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3 max-w-3xl mx-auto w-full h-full">
                {messages.length === 0 && (
                    <ChatArea />
                )}

                {/* แสดง Messages */}
                {messages.map(m => (
                    <div
                        key={m.id}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 mb-2 rounded-2xl shadow-sm ${m.role === 'user'
                                    ? 'bg-blue-500 text-white rounded-br-md'
                                    : 'bg-white text-gray-800 rounded-bl-md'
                                }`}
                        >
                            {m.parts.map((part, index) =>
                                part.type === 'text' ? (
                                    <div key={index} className="whitespace-pre-wrap">{part.text}</div>
                                ) : null
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}