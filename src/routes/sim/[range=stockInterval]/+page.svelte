<script lang="ts">
    import { scaleTime } from "d3-scale";
    import { DateTime } from "luxon";
    import {
        Chart,
        Area,
        Axis,
        Svg,
        LinearGradient,
        Highlight,
        Tooltip,
        TooltipItem,
    } from "layerchart";

    function maxPrice(history: IStockEntry[]) {
        let max = history[0]?.price ?? 0;
        for (const entry of history) {
            max = entry.price > max ? entry.price : max;
        }
        return max;
    }

    const { data } = $props();

    const dateFormat =
        data.range == "day" || data.range == "month" ? "L/d" : "h:mm";
</script>

<div
    class="mt-60 mb-60 grid xl:grid-cols-3 lg:grid-cols-2 gap-8 xl:gap-14 2xl:gap-20"
>
    {#await data.stocks}
        {#each new Array(10) as _}
            <div
                class="card stock-card skeleton bg-opacity-50 gap-10 items-center flex flex-col"
            >
                <div class="skeleton h-3/4 w-full"></div>
                <div class="w-full h-6">
                    <div class="ml-4 skeleton h-full w-28"></div>
                </div>
            </div>
        {/each}
    {:then stocks}
        {#each stocks ?? [] as stock (stock.name)}
            <div class="card stock-card bg-accent shadow-xl hover:shadow-2xl">
                <Chart
                    data={stock.history}
                    x="date"
                    xScale={scaleTime()}
                    y="price"
                    yDomain={[0, maxPrice(stock.history) * 1.5]}
                    yPadding={[10, 0]}
                    yNice
                    padding={{ left: 16, bottom: 24 }}
                    tooltip={{ mode: "bisect-x" }}
                >
                    <Svg>
                        <Axis
                            placement="left"
                            rule={{ class: "stroke-white opacity-25" }}
                            tickLabelProps={{
                                class: "fill-white text-md opacity-50",
                            }}
                        />
                        <Axis
                            placement="bottom"
                            ticks={6}
                            format={(d) =>
                                DateTime.fromJSDate(d).toFormat(dateFormat)}
                            rule={{ class: "stroke-white opacity-25" }}
                            tickLabelProps={{
                                class: "fill-white text-md opacity-50",
                            }}
                        />
                        <LinearGradient
                            class="from-success/50 to-success/0"
                            vertical
                            let:url
                        >
                            <Area
                                line={{ class: "stroke-2 stroke-success" }}
                                fill={url}
                            />
                            <Highlight points lines />
                        </LinearGradient>
                    </Svg>
                    <Tooltip
                        header={(d) =>
                            DateTime.fromMillis(d.date).toFormat(dateFormat)}
                        let:data
                    >
                        <TooltipItem label="price" value={data.price} />
                    </Tooltip>
                </Chart>
                <div class="card-body">
                    <h5 class="card-title">{stock.name}</h5>
                </div>
            </div>
        {/each}
    {/await}
</div>

<style>
    .stock-card {
        padding: 1.5rem;
        width: 450px;
        height: 450px;
    }
</style>
