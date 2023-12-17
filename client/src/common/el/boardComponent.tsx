import React from "react";
import "../styles/board.css";
import CellComponent from "./cellComponent";
import UpperCell from "./upperCell";
import { Board } from "./models/board";

interface boardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

export default function BoardComponent({ board, setBoard }: boardProps) {

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
            <CellComponent cell={cell} key={cell.id} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
