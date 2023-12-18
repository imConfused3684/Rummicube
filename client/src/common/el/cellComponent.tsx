import "../styles/board.css";
import { Cell } from "./models/cell";

import ChipComponent from "./chipComponent";
import { Chip } from "./models/chip";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
}

function ChipInside({ chip }: { chip: Chip | null }){
  if(chip){
    return <ChipComponent chip={chip}/>
  }
  else{
    return <></>
  }
}

export default function CellComponent({ cell, selected, click }: CellProps) {
  if (cell.isDivider) {
    return <div className="cell-divider"></div>;
  }
  else {
    return <div 
    onClick={() => click(cell)}
    className={['cell', selected ? "selected" : ""].join(' ')}>
      <ChipInside chip={cell?.chip}/>
    </div>;
  }
}
