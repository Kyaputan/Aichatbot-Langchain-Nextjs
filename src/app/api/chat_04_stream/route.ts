import { NextRequest, NextResponse } from "next/server"
import { ChatOpenAI } from "@langchain/openai"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { toUIMessageStream } from "@ai-sdk/langchain"
import { createUIMessageStreamResponse, UIMessage, convertToModelMessages } from "ai" // ใช้ส่งไป UI

export const runtime = "edge"
export const maxDuration = 30
const MaxToken: number = 512
// const Timeout: number = 30
// const MaxRetries: number = 10
const Temperature: number = 0.2


export async function POST(req: NextRequest) {

    try {
    const { message }: { message: UIMessage[] } = await req.json()

    const llm = new ChatOpenAI({
        model: process.env.OPENAI_MODEL_NAME || "gpt-4o-mini", // ชื่อโมเดล
        temperature: Temperature, // ความสร้างสรรค์ของคำตอบ มีระดับ 0-1
        maxTokens: MaxToken, // จำนวนคำตอบสูงสุดที่ต้องการ
        // timeout: Timeout, // ระยะเวลาในการรอคำตอบ
        // maxRetries: MaxRetries, // จำนวนครั้งสูงสุดในการลองใหม่
        streaming: true, // เปิดใช้ streaming response
    })

        const prompt = ChatPromptTemplate.fromMessages([
            ["system", "คุณเป็น AI ช่วยเหลือที่ช่วยให้ผู้ใช้สามารถหาข้อมูลที่ต้องการได้"],
            ...convertToModelMessages(message),        // แปลง UIMessage ให้เป็นรูปแบบที่ LangChain เข้าใจ
        ])
        const chain = prompt.pipe(llm)

        const stream = await chain.stream({
            // LangChain ต้องการตัวแปรเปล่าๆ ใน input สำหรับ prompt ที่สร้างจาก message history
        })

        const response = createUIMessageStreamResponse({
            stream: toUIMessageStream(stream),
        })

        return response

    } catch (error) {
        // จัดการ error และ log รายละเอียดเพื่อ debug
        console.error("API Error:", error)
        // ส่ง error response กลับไปยัง client
        return new Response(
          JSON.stringify({
            error: "An error occurred while processing your request",
          }),
          {
            status: 500, // HTTP status code สำหรับ Internal Server Error
            headers: { "Content-Type": "application/json" }, // กำหนด content type เป็น JSON
          }
        )
      }
    }