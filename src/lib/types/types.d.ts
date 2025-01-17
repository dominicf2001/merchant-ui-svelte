interface IStockEntry {
    price: number;
    date: number;
}

interface IStock {
    name: string;
    history: IStockEntry[];
}

type StockInterval = "now" | "hour" | "day" | "month";
