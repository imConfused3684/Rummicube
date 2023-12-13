import {Chip} from "./chip";
import {Board} from "./board";
 
export class Cell {
    readonly x: number;
    readonly y: number;
    chip: Chip | null;
    board: Board;
    availbale: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, chip: Chip | null) {
        this.x = x;
        this.y = y;
        this.chip = chip;
        this.board = board;
        this.id = Math.random();
        this.availbale = false;
    }
}