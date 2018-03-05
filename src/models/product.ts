import { Item } from "./item";

export class Product extends Item{
    id: string; // this is used internally to uniquely identifie the record
    reference: string;
    date: Date;
    grade: string; // Small, Medium or large. Maybe an enum in a select field.
    quantity: number;
    collected: number;
    broken: number;
    remaining: number;
    description: string;
    summary: string; // This is a shorter version of the description. If missing, use the first 150 chars of the description
}