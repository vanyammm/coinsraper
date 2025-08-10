import {getCoinDetails} from "@/services/coingecko.service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  try {
    const {id} = await params;
    const coinDetails = await getCoinDetails(id);
    return NextResponse.json(coinDetails);
  } catch (_error) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
