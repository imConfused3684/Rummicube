import { Cell } from "./cell"

export class Board {
    cells: Cell[][] = []

    public initCells() {
        for (let i = 0; i < 22; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                row.push(new Cell(this, j, i, null))
            }
            this.cells.push(row);
        }
    }
}