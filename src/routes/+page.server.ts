import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";
import { DateTime } from "luxon";

function normalizeToHour(millis: number) {
    return DateTime.fromMillis(millis)
        .set({
            minute: 0,
            second: 0,
            millisecond: 0,
        })
        .toMillis();
}

export const load: PageServerLoad = async ({ params, fetch }) => {
    try {
        async function getStocks(): Promise<IStock[]> {
            const res = await fetch(`${env.BOT_API_URL}/stock`);
            const stocks: IStock[] = await res.json();

            stocks.forEach((stock) => {
                stock.history.forEach(
                    (entry) => (entry.date = normalizeToHour(entry.date)),
                );
            });
            return stocks;
        }

        return {
            stocks: getStocks(),
        };
    } catch (error) {
        console.error(error);
    }
};
