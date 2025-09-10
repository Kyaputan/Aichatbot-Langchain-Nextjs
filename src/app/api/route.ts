import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "API Running with GET" });
}

export async function POST(req: NextRequest) {
    const { name }: { name: string } = await req.json();
    return NextResponse.json({ message: `Hello ${name}!` });
}

export async function PUT(req: NextRequest) {
    const { name }: { name: string } = await req.json();
    return NextResponse.json({ message: `Hello ${name}!` });
}

export async function DELETE(req: NextRequest) {
    const { name }: { name: string } = await req.json();
    return NextResponse.json({ message: `Hello ${name}!` });
}
