import RumButton from "../../common/el/rumButton";
import InfoButton from "../../common/el/infoButton";
import Timer from "../../common/el/timer";

import { Board } from "../../common/el/models/board";
import { ChipSack } from "../../common/el/models/chipSack";
import { Hand } from "../../common/el/models/hand";
import { Chip } from "../../common/el/models/chip";

import "./sessionForm.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import HandComponent from "../../common/el/handComponent";
import BoardComponent from "../../common/el/boardComponent";

import { Colors } from "../../common/el/models/colors";
import { Cell } from "../../common/el/models/cell";
import Logger from "../../common/el/logger";

interface FlagProp {
  flag: boolean;
}

let backupBoard: Board;
let backupHand: Hand;

export default function SessionForm() {
  const [moveFlag, setMoveFlag] = useState<boolean>(true);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [errors, setErrors] = useState<string[]>([]);



  function click(cell: Cell) {
    if (moveFlag) {
      backupBoard = new Board();
      let id  = 0;

      for (let i = 0; i < 8; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < 23; j++) {
          row.push(
            new Cell(
              j,
              i,
              board.cells[i][j].chip,
              id,
              j == 4 || j == 9
            )
          );
          id++;
        }
        backupBoard.cells.push(row);
      }

      backupHand = new Hand();
      hand.chipsInHand.forEach((chip) => {
        backupHand.chipsInHand.add(chip);
      });

      setMoveFlag(false);
    }

    if (
      selectedCell &&
      selectedCell != cell &&
      selectedCell.chip?.canMove(cell)
    ) {
      selectedCell.moveChip(cell);
      setSelectedCell(null);
    } else if (selectedCell == cell) {
      setSelectedCell(null);
    } else {
      setSelectedCell(cell);
    }
  }

  function handClick(chip: Chip) {
    if (moveFlag) {
      backupBoard = new Board();
      let id = 0;
      for (let i = 0; i < 8; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < 23; j++) {
          row.push(
            new Cell(
              j,
              i,
              board.cells[i][j].chip,
              id,
              j == 4 || j == 9
            )
          );
          id++;
        }
        backupBoard.cells.push(row);
      }

      backupHand = new Hand();
      hand.chipsInHand.forEach((chip) => {
        backupHand.chipsInHand.add(chip);
      });

      setMoveFlag(false);
    }

    if (selectedCell && selectedCell.chip === null) {
      selectedCell.chip = chip;
      hand.chipsInHand.delete(chip);

      setSelectedCell(null);
      setHand({ ...hand });
    } else {
      console.log("aasdasds");
    }
  }

  function MoveOrSack({ flag }: FlagProp) {
    function funcS() {
      // initHand();
      getRandomChipToHand(chipSack, hand);
      setHand({ ...hand }); // Обновите состояние руки
    }

    function funcNo() {
      setErrors([]);

      setMoveFlag(true);

      setBoard(backupBoard);

      setHand({ ...backupHand });
    }
    function funcOk() {
      board.checkBoardValidity(setErrors);
    }

    if (flag) {
      return (
        <div className="sackWrapper">
          <InfoButton
            content={<img src="./src/assets/sack.svg" />}
            func={() => funcS()}
          />
        </div>
      );
    } else {
      return (
        <div className="move">
          <InfoButton content="No" func={funcNo} />
          <InfoButton content="Ok" func={funcOk} />
        </div>
      );
    }
  }

  function func777() {
    const setArray = Array.from(hand.chipsInHand).sort(
      (a, b) => a.value - b.value
    );
    hand.chipsInHand = new Set(setArray);
    setHand({ ...hand });
  }
  function func789() {
    const setArray = Array.from(hand.chipsInHand).sort((chip1, chip2) =>
      chip1.compare(chip2)
    );
    hand.chipsInHand = new Set(setArray);
    setHand({ ...hand });
  }
  function timeIsUp() {}

  const [board, setBoard] = useState(new Board());
  const [chipSack, setChipSack] = useState(new ChipSack());
  const [hand, setHand] = useState(new Hand());

  useEffect(() => {
    restart();
  }, []);

  function restart() {
    const newChipSack = new ChipSack();
    setChipSack(newChipSack);

    const newBoard = new Board();
    newBoard.initCells();
    setBoard(newBoard);

    const newHand = new Hand();
    // initHand();
    for (let i = 0; i < 14; i++) {
      getRandomChipToHand(newChipSack, newHand);
    }
    setHand(newHand);
  }

  function getRandomChipToHand(chipSack: ChipSack, hand: Hand) {
    let randInd = Math.floor(Math.random() * chipSack.chips.size) + 1;
    // console.log(randInd);
    let i = 0;
    for (let curChip of chipSack.chips) {
      i++;
      if (i >= randInd) {
        hand.chipsInHand.add(curChip);
        chipSack.chips.delete(curChip);
        break;
      }
    }
  }

  function getRandomChip(chipSack: ChipSack): Chip {
    let randInd = Math.floor(Math.random() * chipSack.chips.size) + 1;
    // console.log(randInd);
    let i = 0;
    for (let curChip of chipSack.chips) {
      i++;
      if (i >= randInd) {
        chipSack.chips.delete(curChip);
        return curChip;
      }
    }
    // return new Chip(-666, Colors.YELLOW, -666, null);
    return new Chip(-666, Colors.YELLOW, -666);
  }

  // function initHand() {
  //   for (let i = 0; i < 14; i++) {
  //     getRandomChip(chipSack, hand);
  //   }
  // }

  return (
    <div className="card">
      <div className="playing-table">
        <BoardComponent
          board={board}
          setBoard={setBoard}
          click={click}
          selectedCell={selectedCell}
        />
        <NavLink className="exitGameButtWrapper" to="/main">
          <RumButton text={"Выход"} func={() => {}} />
        </NavLink>

        <Logger errors={errors} />

        <div className="sortButts">
          <InfoButton content="789" func={func789} />
          <InfoButton content="777" func={func777} />
        </div>

        <MoveOrSack flag={moveFlag} />

        <Timer time={180} func={timeIsUp} />

        <HandComponent hand={hand} handClick={handClick} />
      </div>
    </div>
  );
}
