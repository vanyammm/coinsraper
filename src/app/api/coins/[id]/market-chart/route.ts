import {getCoinChartData} from "@/services/coingecko.service";
import {NextResponse} from "next/server";

export async function GET(request: Request, context: {params: {id: string}}) {
  try {
    const {id} = context.params;
    const chartData = await getCoinChartData(id);
    return NextResponse.json(chartData);
  } catch (_error) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
