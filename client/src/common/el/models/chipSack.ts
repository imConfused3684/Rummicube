import { Chip } from "./chip";
import { Colors } from "./colors"


export class ChipSack {
    // chips: Chip[] = []
    chips: Set<Chip>

    constructor() {
        this.chips = new Set<Chip>();
    }

    public initChips() {

        let chipId = 1;

        //Черные 
        // this.chips.add(new Chip(chipId, Colors.BLACK, 0, null))
        this.chips.add(new Chip(chipId, Colors.BLACK, 0))
        chipId++;

        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 2; j++) {
                // this.chips.add(new Chip(chipId, Colors.BLACK, i + 1, null))
                this.chips.add(new Chip(chipId, Colors.BLACK, i + 1))
                chipId++;

            }
        }

        //Красные 
        // this.chips.add(new Chip(chipId, Colors.RED, 0, null))
        this.chips.add(new Chip(chipId, Colors.RED, 0))
        chipId++;


        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 2; j++) {
                // this.chips.add(new Chip(chipId, Colors.RED, i + 1, null))
                this.chips.add(new Chip(chipId, Colors.RED, i + 1))
                chipId++;

            }
        }

        //Желтые 
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 2; j++) {
                // this.chips.add(new Chip(chipId, Colors.YELLOW, i + 1, null))
                this.chips.add(new Chip(chipId, Colors.YELLOW, i + 1))
                chipId++;
            }
        }

        //Синие 
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 2; j++) {
                // this.chips.add(new Chip(chipId, Colors.BLUE, i + 1, null))
                this.chips.add(new Chip(chipId, Colors.BLUE, i + 1))
                chipId++;

            }
        }
    }
}