interface IStockEntry {
    price: number;
    date: string;
}

interface IStock {
    name: string;
    history: IStockEntry[];
}
