import { NextRequest, NextResponse } from "next/server"
import { ChatOpenAI } from "@langchain/openai"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"

const MaxToken: number = 512
// const Timeout: number = 30
// const MaxRetries: number = 10
const Temperature: number = 0.2

export async function POST(req: NextRequest) {
    const body = await req.json()
    const message: Array<{ role: string, content: string }> = body.message ?? []
    if (!message) {
        return NextResponse.json({ error: "Missing request message" }, { status: 400 })
    }
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "คุณเป็น AI ช่วยเหลือที่ช่วยให้ผู้ใช้สามารถหาข้อมูลที่ต้องการได้"],
        ["user", '{question}'],
    ])

    const llm = new ChatOpenAI({
        model: process.env.OPENAI_MODEL_NAME || "gpt-4o-mini", // ชื่อโมเดล
        temperature: Temperature, // ความสร้างสรรค์ของคำตอบ มีระดับ 0-1
        maxTokens: MaxToken, // จำนวนคำตอบสูงสุดที่ต้องการ
        // timeout: Timeout, // ระยะเวลาในการรอคำตอบ
        // maxRetries: MaxRetries, // จำนวนครั้งสูงสุดในการลองใหม่
    })
    
    const chain = prompt.pipe(llm).pipe(new StringOutputParser())
    try {
        const response = await chain.invoke({question: message[0].content ?? ""})
        console.log("response:", response)
        return NextResponse.json({ message: response }, 
                                { status: 200 })
    } catch (error) {
        console.error("API Error:", error)
        return NextResponse.json({ message: "An error occurred while processing your request" }, 
                                { status: 500 })
    }
}