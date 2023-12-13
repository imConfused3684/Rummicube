import "../styles/board.css";
import { Cell } from "./models/cell";

interface CellProps {
  cell: Cell;
}

export default function CellComponent({ cell }: CellProps) {
  return <div className="cell">{cell.chip}</div>;
}
