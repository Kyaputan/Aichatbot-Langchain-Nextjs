// components/ChatInput/ChatInput.jsx
import { useState } from 'react'

export default function ChatInput({ onSendMessage, status }: { onSendMessage: (message:any) => void, status: string }) {
    // กำหนด state สำหรับ input text
    const [input, setInput] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // ป้องกันหน้า refresh
        if (!input.trim()) return // ไม่ส่งถ้า input ว่าง

        // เรียกใช้ callback function
        onSendMessage({
            text: input,
        })

        // ล้างช่อง input หลังจากส่ง
        setInput('')
    }

    return (
        <div className="bg-white border-t p-4">
            <div className="max-w-3xl mx-auto w-full">
                {/* แสดงสถานะการพิมพ์ของ AI */}
                {(status === 'submitted' || status === 'streaming') &&
                    <div className="text-gray-500 italic mb-2 text-sm">🤔 AI กำลังคิด...</div>
                }

                <form
                    className="flex items-center space-x-2"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="flex-grow p-3 border border-gray-300 text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={input}
                        placeholder="พิมพ์ข้อความที่นี่..."
                        onChange={e => setInput(e.target.value)}
                        disabled={status !== 'ready'}
                    />
                    <button
                        type="submit"
                        className="p-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                        disabled={status !== 'ready' || !input.trim()}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}