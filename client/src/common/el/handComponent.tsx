import React from "react";
import "../styles/hand.css";
// import { ChipSack } from "./models/chipSack";
//import { Chip } from "./models/chip";
import ChipComponent from "./chipComponent";
import { Hand } from "./models/hand";

import { Cell } from "./models/cell"

interface handProps {
  hand: Hand;
  click: (cell: Cell) => void;
}

export default function HandComponent({ hand, click }: handProps) {
//   let chipsInHand = new Set<Chip>();

//   for (let i = 1; i <= 14; i++) {
//     let randInd = Math.floor(Math.random() * chipSack.chips.size) + 1;
//     console.log(randInd);
//     let i = 0;
//     for (let curChip of chipSack.chips) {
//       i++;
//       if (i >= randInd) {
//         chipsInHand.add(curChip);
//         chipSack.chips.delete(curChip);
//         break;
//       }
//     }
//   }

  return (
    <div className="hand">
      {[...hand.chipsInHand].map((chip, index) => (
        <React.Fragment key={index}>
          <div key={chip.id}><ChipComponent chip={chip}  /></div>
        </React.Fragment>
      ))}
    </div>
  );
}
