import React, { useState } from "react";
import "../styles/board.css";
import CellComponent from "./cellComponent";
import UpperCell from "./upperCell";
import { Board } from "./models/board";

import { Cell } from "./models/cell"

interface boardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

export default function BoardComponent({ board, setBoard }: boardProps) {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function click(cell: Cell){
    if(selectedCell && selectedCell != cell && selectedCell.chip?.canMove(cell)){
      selectedCell.moveChip(cell);
      setSelectedCell(null);
    }else{
      setSelectedCell(cell);
    }
  }

  const upperCellsSmallSection = Array.from({ length: 4 }, (_, index) => (
    <UpperCell num={1} />
  ));

  const upperCellsLargeSection = Array.from({ length: 13 }, (_, index) => (
    <UpperCell num={index+1} />
  ));

  return (
    <div className="board">

      {upperCellsSmallSection}
      <div className="cell-divider"></div>
      {upperCellsSmallSection}
      <div className="cell-divider"></div>
      {upperCellsLargeSection}

      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell) => (
            <CellComponent 
            cell={cell} 
            key={cell.id} 
            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
            click={click}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
