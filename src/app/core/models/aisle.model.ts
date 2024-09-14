import { MarketType } from "../services/enum.service";

export interface Aisle {
    marketType:MarketType
    aisleNumber: string;
    type: string;
    products: Product[]
}

export interface Product {
    id: string;
    name: string;
}