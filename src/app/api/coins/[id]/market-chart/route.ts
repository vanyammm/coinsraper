import {getCoinChartData} from "@/services/coingecko.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  try {
    const {id} = await params;
    const {searchParams} = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "7", 10);

    const chartData = await getCoinChartData(id, days);
    return NextResponse.json(chartData);
  } catch (_error) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
