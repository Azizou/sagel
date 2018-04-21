import { Item } from "./item";

export class Expense extends Item {
    id: string;
    reference: string;
    date: Date;
    description: string;
    quantity: number;
    unit_price: number;
    total_cost: number;
    amount_paid: number;
    amount_remaining: number;
}