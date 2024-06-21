import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";
import { DateTime, type DateObjectUnits } from "luxon";

function normalizeTime(millis: number, range: StockInterval) {
    let options: DateObjectUnits = {
        minute: 0,
        second: 0,
        millisecond: 0,
    };

    switch (range) {
        case "month":
        case "day":
            options.hour = 0;
    }

    return DateTime.fromMillis(millis).set(options).toMillis();
}

async function getStocks(range: StockInterval): Promise<IStock[]> {
    const res = await fetch(`${env.BOT_API_URL}/stock/${range}`);
    const stocks: IStock[] = await res.json();

    stocks.forEach((stock) => {
        stock.history.forEach(
            (entry) => (entry.date = normalizeTime(entry.date, range)),
        );
    });
    return stocks;
}

export const load: PageServerLoad = async ({ params, fetch }) => {
    try {
        const range: StockInterval = params.range;

        return {
            range,
            stocks: getStocks(range),
        };
    } catch (error) {
        console.error(error);
    }
};
