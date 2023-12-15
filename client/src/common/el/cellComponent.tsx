import "../styles/board.css";
import { Cell } from "./models/cell";

interface CellProps {
  cell: Cell;
}

export default function CellComponent({ cell }: CellProps) {
  if (cell.isDivider) {
    return <div className="cell-divider">{cell.chip}</div>;
  }
  else {
    return <div className="cell">{cell.chip}</div>;
  }
}
