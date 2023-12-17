import { Chip } from "./chip"

export class Hand {
    chipsInHand: Set<Chip>

    constructor() {
        this.chipsInHand = new Set<Chip>;
    }
}