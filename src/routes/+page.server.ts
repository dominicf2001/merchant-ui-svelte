import type { PageServerLoad } from "./$types";
import { env } from "$env/dynamic/private";

export const load: PageServerLoad = async ({ params, fetch }) => {
    try {
        const res = await fetch(`${env.BOT_API_URL}/stock`);
        const stocks: IStock[] = await res.json();
        return {
            stocks,
        };
    } catch (error) {
        console.error(error);
    }
};
