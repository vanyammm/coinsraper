import {getCoinDetails} from "@/services/coingecko.service";
import {NextResponse} from "next/server";

interface Params {
  params: {id: string};
}

export async function GET(request: Request, {params}: Params) {
  try {
    const {id} = params;
    const coinDetails = await getCoinDetails(id);
    return NextResponse.json(coinDetails);
  } catch (error) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
