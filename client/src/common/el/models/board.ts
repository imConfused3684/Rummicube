import { Cell } from "./cell"
import { Chip } from "./chip";

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

    public getCell(x: number, y: number){
        return this.cells[x][y];
    }

    public addChipToCell(x: number, y: number, chip: Chip){
        chip.cell = this.cells[x][y];
        this.cells[x][y].chip = chip;
    }
}