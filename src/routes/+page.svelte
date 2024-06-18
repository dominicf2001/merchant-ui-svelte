<script lang="ts">
    import { scaleTime } from "d3-scale";
    import {
        Chart,
        Tooltip,
        TooltipItem,
        Highlight,
        Area,
        Axis,
        Svg,
    } from "layerchart";

    const { data } = $props();
    const stocks = data.stocks ?? [];
    console.log(stocks);
</script>

<div class="mt-60 mb-60 grid grid-cols-2 gap-40">
    {#each stocks as stock (stock.name)}
        <div class="card p-8 w-[500px] h-[500px] bg-primary shadow-xl">
            <div class="h-[500px] p-4 border rounded">
                <Chart
                    data={stock.history}
                    x="date"
                    xScale={scaleTime()}
                    y="price"
                    yDomain={[0, null]}
                    yNice
                    padding={{ left: 16, bottom: 24 }}
                    tooltip={{ mode: "bisect-x" }}
                >
                    <Svg>
                        <Axis placement="left" grid rule />
                        <Axis placement="bottom" rule />
                        <Area
                            line={{ class: "stroke-2 stroke-primary" }}
                            class="fill-primary/30"
                        />
                        <Highlight points lines />
                    </Svg>
                    <Tooltip header={(data) => data.date} let:data>
                        <TooltipItem label="value" value={data.value} />
                    </Tooltip>
                </Chart>
            </div>
            <div class="card-body">
                <h5 class="card-title">{stock.name}</h5>
            </div>
        </div>
    {/each}
</div>
