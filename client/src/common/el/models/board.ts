import { Cell } from "./cell"
import { Chip } from "./chip";
import {Colors} from "./colors";

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

    public ckeckRow789(row: Cell[]): boolean{
        let flag = true;

        let checked = 0;
        let startFlag = false;

        let tempValue: number;
        let tempColor: Colors;

        row.forEach(cell => {
            if(cell.chip && startFlag == false){
                console.log(1 + " / " + checked);

                startFlag = true;

                tempValue = cell.chip.value;
                tempColor = cell.chip.color;
                checked++;
            }else if(cell.chip===null && startFlag){
                console.log(2 + " / " + checked);
                startFlag = false;

                if(checked < 3){
                    console.log("false indeed2");
                    flag = false;
                }
                else{
                    checked = 0;
                }
            }
            else if(cell.chip && startFlag){
                console.log(3 + " / " + checked);
                if(tempValue == 0 && cell.chip.value == 1){
                    flag = false;
                }
                else if(tempValue == 0 || cell.chip.value == 0 || (tempColor == cell.chip.color && tempValue + 1 == cell.chip.value)){
                    if(cell.chip.value == 0){
                        tempValue = tempValue + 1;
                    }
                    else{
                        tempValue = cell.chip.value;
                    }
                    checked++;
                }
                else{
                    console.log("false indeed3");
                    flag = false;
                }
            }
        });

        return flag;
    }
}