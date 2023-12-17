import { Colors } from "./colors"
import { Cell } from "./cell"

export class Chip {
    id: number;
    color: Colors;
    value: any;
    cell: Cell | null;

    constructor( id: number, color: Colors, value: any, cell: Cell | null) {
        this.id = id;
        this.color = color;
        this.value = value;
        this.cell = null;
    }
}