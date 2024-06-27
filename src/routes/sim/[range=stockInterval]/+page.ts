import { DateTime, type DateObjectUnits } from "luxon";
import type { Load } from "@sveltejs/kit";

function normalizeTime(millis: number, range: StockInterval) {
    let options: DateObjectUnits = {
        second: 0,
        millisecond: 0,
    };

    if (range == "month" || range == "day") {
        options.hour = 0;
        options.minute = 0;
    }

    return DateTime.fromMillis(millis).set(options).toMillis();
}

export const load: Load = async ({ params, fetch }) => {
    async function getStocks(range: StockInterval): Promise<IStock[]> {
        const stocks: IStock[] = await fetch(`http://localhost:3000/stock/${range}`)
            .then(res => res.json())
            .then((stocks: IStock[]) => {
                stocks.forEach((stock) =>
                    stock.history.forEach(
                        (entry) => (entry.date = normalizeTime(entry.date, range)),
                    )
                )
                return stocks;
            });
        console.log(stocks);
        return stocks;
    }

    try {
        const range: StockInterval = (params.range ?? "now") as StockInterval;

        return {
            range,
            stocks: getStocks(range),
        };
    } catch (error) {
        console.error(error);
    }
};
