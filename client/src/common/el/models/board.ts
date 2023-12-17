import { Cell } from "./cell"

export class Board {
    cells: Cell[][] = []

    public initCells() {

        for(let i = 0; i < 3; i++) {

        }

        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 23; j++) {
                row.push(new Cell(this, j, i, null, j == 4 || j == 9))
            }
            this.cells.push(row);
        }

    
    }
}