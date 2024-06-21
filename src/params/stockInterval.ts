export function match(param: any): param is StockInterval {
    const stockIntervals = ["now", "hour", "day", "month"] as const;
    return stockIntervals.includes(param);
}
