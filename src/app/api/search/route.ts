import {searchCoins} from "@/services/coingecko.service";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({error: "Query is required"}, {status: 400});
  }

  const results = await searchCoins(query);
  return NextResponse.json(results);
}
