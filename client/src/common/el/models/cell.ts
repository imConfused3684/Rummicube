import { Chip } from "./chip";
// import { Board } from "./board";

export class Cell {
    readonly x: number;
    readonly y: number;
    chip: Chip | null;
    availbale: boolean;
    id: number;
    isDivider: boolean;

    // constructor(board: Board, x: number, y: number, chip: Chip | null, isDivider: boolean) {
    constructor(x: number, y: number, chip: Chip | null, id: number, isDivider: boolean) {

            this.x = x;
            this.y = y;
            this.chip = chip;
            // this.id = Math.random();
            this.id = id;
            this.availbale = false;
            this.isDivider = isDivider;
        }

        moveChip(target: Cell){
            if (this.chip && this.chip.canMove(target)) {
                this.chip.moveChip(target);
                target.chip = this.chip;
                this, this.chip = null;
            }
        }
    }