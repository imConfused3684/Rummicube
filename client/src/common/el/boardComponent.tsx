import React/*, { useState }*/ from "react";
import "../styles/board.css";
import CellComponent from "./cellComponent";
import ConditionComponent from "./conditionComponent";
import UpperCell from "./upperCell";
import { Board } from "./models/board";

import { Cell } from "./models/cell"

interface boardProps {
  board: Board;
  setBoard: (board: Board) => void;
  click: (cell: Cell) => void;
  selectedCell: Cell | null;
  gameStarted: boolean;
  text: string[];
}

export default function BoardComponent({ board, setBoard, click, selectedCell, gameStarted, text }: boardProps) {
  

  const upperCellsSmallSection = Array.from({ length: 4 }, (_, index) => (
    <UpperCell num={1} />
  ));

  const upperCellsLargeSection = Array.from({ length: 13 }, (_, index) => (
    <UpperCell num={index+1} />
  ));

  if(gameStarted){
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
  else{
    // return ( <p>{text}</p> );
    return ( <ConditionComponent conditions={text}/> );
  }

  
}
