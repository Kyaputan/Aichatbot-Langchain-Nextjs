import { NextResponse } from "next/server"
import { ChatOpenAI } from "@langchain/openai"


const MaxToken: number = 256
// const Timeout: number = 30
// const MaxRetries: number = 10

// const llm = new ChatOpenAI({
//     model: "gpt-4o-mini", // ชื่อโมเดล
//     temperature: 0, // ความสร้างสรรค์ของคำตอบ มีระดับ 0-1
//     maxTokens: MaxToken, // จำนวนคำตอบสูงสุดที่ต้องการ
//     timeout: Timeout, // ระยะเวลาในการรอคำตอบ
//     maxRetries: MaxRetries, // จำนวนครั้งสูงสุดในการลองใหม่
//     // apiKey: "...",  // API Key ของคุณ
//     // baseUrl: "...", // URL ของ API
//     // organization: "...", // ชื่อองค์กรของคุณ
// })

// const input = `Translate "I love programming" into Thai.`

// // Model จะทำการแปลข้อความ
// // invoke คือ การเรียกใช้งานโมเดล
// const response = await llm.invoke(input)
// console.log(response)

export async function POST() {

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

  // สร้าง instance ของ ChatOpenAI (OpenRouter)
  // const llm = new ChatOpenAI({
  //   apiKey: process.env.OPENROUTER_API_KEY,
  //   model: process.env.OPENROUTER_MODEL_NAME, // ชื่อโมเดลที่ต้องการใช้
  //   cache: false, // ปิดใช้งาน cache
  //   temperature: 0.7, // ความสร้างสรรค์ของคำตอบ มีระดับ 0-1 // 0 คือ ตอบตรง ๆ // 1 คือ ตอบแบบสร้างสรรค์
  //   maxTokens: 1000, // จำนวนคำตอบสูงสุดที่ต้องการ 1000 token
  //   configuration: {
  //     baseURL: process.env.OPENROUTER_API_BASE,
  //   },
  //   // ถ้า provider ไม่รองรับ stream usage ให้ปิดได้ (บาง proxy ต้องการ)
  //   streamUsage: false,
  // })



  const input = `Translate "I love programming" into Thai.`
  const response = await llm.invoke(input)
  console.log(response)
  return NextResponse.json({ message: response })
}