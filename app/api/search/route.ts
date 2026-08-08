import { NextResponse } from "next/server";
import { searchTools } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const results = await searchTools(q);
  return NextResponse.json(results);
}
