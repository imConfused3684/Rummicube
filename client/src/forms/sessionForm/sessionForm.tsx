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

import { Colors } from "../../common/el/models/colors"

interface FlagProp {
  flag: boolean;
}

export default function SessionForm() {
  function MoveOrSack({ flag }: FlagProp) {
    function funcS() {
      // initHand();
      getRandomChipToHand(chipSack, hand);
      setHand({ ...hand }); // Обновите состояние руки
    }

    function funcNo() {}
    function funcOk() {}

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
    
    const setArray = Array.from(hand.chipsInHand).sort((a, b) => a.value - b.value);
    hand.chipsInHand = new Set(setArray);
    setHand({ ...hand });
  }
  function func789() {
    const setArray = Array.from(hand.chipsInHand).sort((chip1, chip2) => chip1.compare(chip2));
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
    newBoard.addChipToCell(1,1,getRandomChip(newChipSack));
    newBoard.addChipToCell(1,2,getRandomChip(newChipSack));
    newBoard.addChipToCell(1,3,getRandomChip(newChipSack));

    newBoard.addChipToCell(2,10,getRandomChip(newChipSack));
    newBoard.addChipToCell(7,11,getRandomChip(newChipSack));
    newBoard.addChipToCell(7,12,getRandomChip(newChipSack));
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
    return new Chip(-666, Colors.YELLOW, -666, null);
  }

  // function initHand() {
  //   for (let i = 0; i < 14; i++) {
  //     getRandomChip(chipSack, hand);
  //   }
  // }

  return (
    <div className="card">
      <div className="playing-table">
        <BoardComponent board={board} setBoard={setBoard} />
        <NavLink className="exitGameButtWrapper" to="/main">
          <RumButton text={"Выход"} func={() => {}} />
        </NavLink>

        <div className="sortButts">
          <InfoButton content="789" func={func789} />
          <InfoButton content="777" func={func777} />
        </div>

        <MoveOrSack flag={true} />

        <Timer time={180} func={timeIsUp} />

        <HandComponent hand={hand} />
      </div>
    </div>
  );
}
