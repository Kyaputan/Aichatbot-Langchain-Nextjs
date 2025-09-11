import { NextResponse } from "next/server"
import { ChatOpenAI } from "@langchain/openai"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

const MaxToken: number = 2048
// const Timeout: number = 30
const MaxRetries: number = 10
const Temperature: number = 0

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
    model: process.env.OPENAI_MODEL_NAME || "gpt-4o-mini", // ชื่อโมเดล
    temperature: 0, // ความสร้างสรรค์ของคำตอบ มีระดับ 0-1
    maxTokens: MaxToken, // จำนวนคำตอบสูงสุดที่ต้องการ
    // timeout: Timeout, // ระยะเวลาในการรอคำตอบ
    // maxRetries: MaxRetries, // จำนวนครั้งสูงสุดในการลองใหม่
    // apiKey: "...",  // API Key ของคุณ
    // baseUrl: "...", // URL ของ API
    // organization: "...", // ชื่อองค์กรของคุณ
  })

  // สร้าง instance ของ Gemini
  // const llm = new ChatGoogleGenerativeAI({
  //   model: process.env.GOOGLE_MODEL_NAME || "gemini-2.5-flash",
  //   temperature: 0,
  //   maxOutputTokens: MaxToken,
  //   maxRetries: MaxRetries,
  //   // timeout: Timeout,
  //   // apiKey: "...",
  //   // baseUrl: "...",
  //   // organization: "...",
  // })


  // สร้าง instance ของ OpenRouter
  // const llm = new ChatOpenAI({
  //   apiKey: process.env.OPENROUTER_API_KEY,
  //   model: process.env.OPENROUTER_MODEL_NAME || "qwen/qwen3-235b-a22b-2507", // ชื่อโมเดลที่ต้องการใช้
  //   cache: false, // ปิดใช้งาน cache
  //   temperature: Temperature, // ความสร้างสรรค์ของคำตอบ มีระดับ 0-1 // 0 คือ ตอบตรง ๆ // 1 คือ ตอบแบบสร้างสรรค์
  //   maxTokens: Math.max(MaxToken, 1000), // จำนวนคำตอบสูงสุดที่ต้องการ 1000 token
  //   configuration: {
  //     baseURL: process.env.OPENROUTER_API_BASE,
  //   },
  //   streamUsage: false, // ถ้าใช้ stream ต้องตั้งค่าเป็น true
  // })

  // สร้าง instance ของ Ollama (Local) - ใช้ ChatOpenAI กับ baseURL ของ Ollama
  //   const llm = new ChatOpenAI({
  //     model: process.env.OPENAI_MODEL_NAME || "gemma:2b", // ชื่อโมเดลที่ต้องการใช้
  //     temperature: Temperature,
  //     maxTokens: MaxToken,
  //     configuration: {
  //         baseURL: process.env.OLLAMA_API_BASE || "http://localhost:11434/v1", // URL ของ Ollama API
  //     },
  //     apiKey: "ollama", // Ollama ไม่ต้องการ API key จริง แต่ต้องใส่ค่าอะไรก็ได้
  // })

 // vLLM (Local) ====================================================================================
    // สร้าง instance ของ vLLM (Local) - ใช้ ChatOpenAI กับ baseURL ของ vLLM
    // const llm = new ChatOpenAI({
    //     model: process.env.VLLM_MODEL_NAME || "meta-llama/llama-3.3-70b-instruct", // ชื่อโมเดลที่ต้องการใช้
    //     temperature: 0.7,
    //     maxTokens: 1000,
    //     configuration: {
    //         baseURL: process.env.VLLM_API_BASE || "http://localhost:8000/v1/chat/completions", // URL ของ vLLM API
    //     },
    //     apiKey: "vllm", // vLLM ไม่ต้องการ API key จริง แต่ต้องใส่ค่าอะไรก็ได้
    // })

  // const input = `Translate "I love programming" into Thai.`
  // const response = await llm.invoke(input)
  // console.log(response)
  try {
    const response = await llm.invoke([
      {
        role: "system",
        content:
          "คุณเป็นจัดการฝ่ายการเงินของบริษัท คุญตอบคำถามให้พนักงานในบริษัทในเรื่องการเงิน",
      },
      {
        role: "human", // "human" เป็น alias ของ "user"
        content: "สวัสดีครับ งบประมาณปีนี้เป็นอย่างไรบ้าง?",
      },
    ])

    {
      // เอกสารฝั่ง LangChain JS ชี้ว่าข้อความมี “role” เช่น "user", "assistant" 
      // และ LangChain จะดูแลการแมปให้เข้ากับผู้ให้บริการเมื่อเรียกใช้โมเดล 
      // (จึงยอมรับทั้งสไตล์ LangChain "human" และสไตล์ผู้ให้บริการ "user") 

      // ข้อแนะนำการใช้งาน
      // ถ้าจะให้ทีมอ่านง่ายและสอดคล้องกับเอกสารผู้ให้บริการหลายเจ้า แนะนำใช้ "user"/"assistant"/"system" เป็นหลัก 
      // ส่วน "human"/"ai" ถือเป็น alias ของ LangChain เท่านั้น (ผลเท่ากัน)

      // เมื่อส่ง “ประวัติแชต” ย้อนหลัง อย่าลืมใช้ assistant (หรือ ai) สำหรับข้อความตอบกลับก่อนหน้า 
      // และ system สำหรับคำสั่งตั้งต้น (system prompt) เพื่อให้โมเดลตีความบริบทถูกต้อง
    }


    // ดึงชื่อโมเดลจริงจาก metadata (บาง provider ใส่ model หรือ model_name)
    const meta = response.response_metadata || {}
    const usedModel = meta.model || meta.model_name || "unknown"

    return NextResponse.json({
      content: response.content,
      usedModel,
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ message: "An error occurred while processing your request" }, { status: 500 })
  }
}