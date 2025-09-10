import { NextResponse, NextRequest } from "next/server"
import { ChatOpenAI } from "@langchain/openai"

const MaxToken: number = 256
// const Timeout: number = 30
// const MaxRetries: number = 10


export async function POST(req: NextRequest) {


    const llm = new ChatOpenAI({
        model: "gpt-4o-mini", // ชื่อโมเดล
        temperature: 0, // ความสร้างสรรค์ของคำตอบ มีระดับ 0-1
        maxTokens: MaxToken, // จำนวนคำตอบสูงสุดที่ต้องการ
        // timeout: Timeout, // ระยะเวลาในการรอคำตอบ
        // maxRetries: MaxRetries, // จำนวนครั้งสูงสุดในการลองใหม่
        // apiKey: "...",  // API Key ของคุณ
        // baseUrl: "...", // URL ของ API
        // organization: "...", // ชื่อองค์กรของคุณ
    })
    // Example Payload
    // {
    //   "message": [
    //       {
    //           "role": "system",
    //           "content": "คุณเป็นจัดการฝ่ายการเงินของบริษัท คุญตอบคำถามให้พนักงานในบริษัทในเรื่องการเงิน"
    //       },
    //       {
    //           "role": "user",
    //           "content": "สวัสดีครับ ปกติบริษัทเราแบ่งงบการตลาดเป็นกี่เปอร์เซ็นต์ครับ"
    //       }
    //   ]
    // }
    
    const data = await req.json();
    const message: [] = data.message ?? []


    try {
        console.log("Message:", message)
        const response = await llm.invoke(message)

        // ดึงชื่อโมเดลจริงจาก metadata (บาง provider ใส่ model หรือ model_name)
        const meta = response.response_metadata || {}
        const usedModel = meta.model || meta.model_name || "unknown"

        // ส่งกลับทั้งคำตอบและชื่อโมเดล (จะได้เห็นชัดว่า “ตอบจากโมเดลอะไร”)
        return NextResponse.json({
            content: response.content,
            usedModel,
        })

    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ message: "An error occurred while processing your request" }, { status: 500 })
    }
}