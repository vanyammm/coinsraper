import {getCoinChartData} from "@/services/coingecko.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  request: NextRequest,
  {params}: {params: {id: string}},
) {
  try {
    const {id} = params;
    const chartData = await getCoinChartData(id);
    return NextResponse.json(chartData);
  } catch (_error) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
