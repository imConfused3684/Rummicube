import { Cell } from "./cell"
import { Chip } from "./chip";
import { Colors } from "./colors";

export class Board {
    cells: Cell[][] = []

    public initCells() {

     
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 23; j++) {
                row.push(new Cell(this, j, i, null, j == 4 || j == 9))
            }
            this.cells.push(row);
        }


    }

    public getCell(x: number, y: number) {
        return this.cells[x][y];
    }

    public addChipToCell(x: number, y: number, chip: Chip) {
        chip.cell = this.cells[x][y];
        this.cells[x][y].chip = chip;
    }

    public checkBoardValidity(): boolean {
    // [0; 3], [5; 8] — одинаковые числа
    // [10; 22] — возрастание
    for (let i = 0; i < 8; i++) {
        let row = this.cells[i].slice(0, 4);
        if (!(this.checkRow777(row))) {
            return false;
        }
        row = this.cells[i].slice(5, 9);
        if (!(this.checkRow777(row))) {
            return false;
        }

        row = this.cells[i].slice(10, 23);
        if (!(this.ckeckRow789(row))) {
            return false;
        }
    }
    return true;
}

    ckeckRow789(row: Cell[]): boolean {
    let flag = true;

    let checked = 0;
    let startFlag = false;

    let tempValue: number;
    let tempColor: Colors;

    row.forEach(cell => {
        if (cell.chip && startFlag == false) {
            console.log(1 + " / " + checked);

            startFlag = true;

            tempValue = cell.chip.value;
            tempColor = cell.chip.color;
            checked++;
        } else if (cell.chip === null && startFlag) {
            console.log(2 + " / " + checked);
            startFlag = false;

            if (checked < 3) {
                console.log("false indeed2");
                flag = false;
            }
            else {
                checked = 0;
            }
        }
        else if (cell.chip && startFlag) {
            console.log(3 + " / " + checked);
            if (tempValue == 0 && cell.chip.value == 1) {
                flag = false;
            }
            else if (tempValue == 0 || cell.chip.value == 0 || (tempColor == cell.chip.color && tempValue + 1 == cell.chip.value)) {
                if (cell.chip.value == 0) {
                    tempValue = tempValue + 1;
                }
                else {
                    tempValue = cell.chip.value;
                }
                checked++;
            }
            else {
                console.log("false indeed3");
                flag = false;
            }
        }
    });

    return flag;
}

    checkRow777(row: Cell[]): boolean {
    let length = 0;
    let streak = false;
    for (let i = 0; i < 4; ++i) {
        if (row[i].chip != null) {
            if (streak) {
                ++length;
            }
            else {
                streak = true;
                length = 1;
            }
        }
        else {
            streak = false;
            if (length > 0 && length < 3) {
                return false;
            }
            if (length >= 3) {
                let jokers = 0;
                if (row[i - 1].chip?.value == 0) {
                    ++jokers;
                }
                let colors = new Set<Colors>();
                let value = Math.max(row[i - 1].chip?.value, row[i - 2].chip?.value, row[i - 3].chip?.value);
                if (row[i - 1].chip?.value !== 0) {
                    colors.add(row[i - 1].chip?.color);
                }
                for (let j = i - 2; j >= i - length; --j) {
                    if (row[j].chip?.value == 0) {
                        ++jokers;
                        continue;
                    }
                    colors.add(row[j].chip?.color);
                    if (row[j].chip?.value !== value) {
                        return false;
                    }
                }
                if (colors.size < length - jokers) {
                    return false;
                }
                length = 0;
            }
        }
    }
    if (length >= 3) {
        let jokers = 0;
        if (row[3].chip?.value == 0) {
            ++jokers;
        }
        let colors = new Set<Colors>();
        let value = Math.max(row[3].chip?.value, row[2].chip?.value, row[1].chip?.value);
        colors.add(row[3].chip?.color);
        for (let j = 2; j >= 4 - length; --j) {
            if (row[j].chip?.value == 0) {
                ++jokers;
                continue;
            }
            colors.add(row[j].chip?.color);
            if (row[j].chip?.value !== value) {
                return false;
            }
        }
        if (colors.size < length - jokers) {
            return false;
        }
    }
    return true;
}


}