import { Item } from "./item";

export class Product extends Item{
    _id: string;
    reference: string;
    date: Date;
    quantity: number;
    collected: number;
    broken: number;
    remaining: number;
    description: string;
}