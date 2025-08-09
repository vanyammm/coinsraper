import {getCoinDetails} from "@/services/coingecko.service";
import {NextResponse} from "next/server";

export async function GET(request: Request, {params}: {params: {id: string}}) {
  try {
    const {id} = params;
    const coinDetails = await getCoinDetails(id);
    return NextResponse.json(coinDetails);
  } catch (_error) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
