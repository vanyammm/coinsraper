import {COINS_PER_PAGE} from "@/constants/coindata.constants";
import {getCoinsByIds, getCoinsMarket} from "@/services/coingecko.service";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url);
    const ids = searchParams.get("ids");

    if (ids) {
      const idsArray = ids.split(",");
      const coins = await getCoinsByIds(idsArray);
      return NextResponse.json(coins);
    } else {
      const page = parseInt(searchParams.get("page") || "1", 10);
      const perPage = parseInt(
        searchParams.get("per_page") || `${COINS_PER_PAGE}`,
      );
      const coins = await getCoinsMarket({pageParam: page, perPage: perPage});
      return NextResponse.json(coins);
    }
  } catch (error) {
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
