import { FactPart } from '../models/fact-part.model';

export function getRandomItem(items: any[]): FactPart {
    const now = new Date();
    const randomIndex = now.getMilliseconds() % items.length;
    return items[randomIndex];
}