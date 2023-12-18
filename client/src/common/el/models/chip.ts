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

    compare(otherChip: Chip): number {
        // Сравнение по color
        if (this.color > otherChip.color) {
            return 1;
        } else if (this.color < otherChip.color) {
            return -1;
        }
        // При одинаковом color сравниваем по value
        return this.value - otherChip.value;
    }

    canMove(target: Cell):boolean{
        return !target?.chip;
    }

    moveChip(target: Cell){

    }
}