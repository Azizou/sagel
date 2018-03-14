import { Item } from "./item";

export class Sale extends Item {
    id: string;
    reference: string;
    date: Date;
    description: string;
    quantity: number;
    cost_of_sale: number;
    amount_received: number;
    amount_remaining: number;
}