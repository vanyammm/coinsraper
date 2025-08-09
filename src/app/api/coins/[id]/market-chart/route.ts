import {getCoinChartData} from "@/services/coingecko.service";
import {NextResponse} from "next/server";

interface Params {
  params: {id: string};
}

export async function GET(request: Request, {params}: Params) {
  try {
    const {id} = params;
    const chartData = await getCoinChartData(id);
    return NextResponse.json(chartData);
  } catch (error) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
