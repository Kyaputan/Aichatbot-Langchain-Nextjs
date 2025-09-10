import { NextResponse , NextRequest } from "next/server";

// GET
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "World";
    return NextResponse.json({ message: `Hello ${name}!` });
}

// POST
export async function POST(req: NextRequest) {
    const data = await req.json();
    return NextResponse.json({ message: `Hello ${data.name}!` });
}

// PUT
export async function PUT(req: NextRequest) {
    const data = await req.json();
    return NextResponse.json({ message: `Hello ${data.name}!` });
}

// DELETE ไม่ลบจริงน่ะ จะทำตัวแปร Soft Delete คือจาก True ไป False
export async function DELETE() {
    return NextResponse.json({ message: `Deleted!` });
}
