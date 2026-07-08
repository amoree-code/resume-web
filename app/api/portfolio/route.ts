import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/portfolio";

export const revalidate = 3600;

export function GET() {
  return NextResponse.json(getPortfolioData());
}
