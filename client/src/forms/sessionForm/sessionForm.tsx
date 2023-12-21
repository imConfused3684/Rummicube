import RumButton from "../../common/el/rumButton";
import InfoButton from "../../common/el/infoButton";
import Timer from "../../common/el/timer";

import { Board } from "../../common/el/models/board";
import { ChipSack } from "../../common/el/models/chipSack";
import { Hand } from "../../common/el/models/hand";
import { Chip } from "../../common/el/models/chip";

import "./sessionForm.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import HandComponent from "../../common/el/handComponent";
import BoardComponent from "../../common/el/boardComponent";

import { Colors } from "../../common/el/models/colors";
import { Cell } from "../../common/el/models/cell";
import Logger from "../../common/el/logger";

import { Player, socket, createNewGame } from "../../common/el/models/player";
import { nanoid } from "nanoid";
// const socket = io("http://localhost:6284/");
//   socket.on("connect", () => {
//     console.log(socket.id);
//   });

interface FlagProp {
  flag: boolean;
}

let backupBoard: Board;
let backupHand: Hand;

export default function SessionForm() {

  const queryParameters = new URLSearchParams(window.location.search);
  const uName = queryParameters.get("username");
  const wins = queryParameters.get("wins");
  const host = queryParameters.get("host");
  const timeString = queryParameters.get("time");
  const time = timeString ? parseInt(timeString, 10) : 0;

  const pnum = queryParameters.get("pnum");

  const sessionId = nanoid();
  const creator = new Player(socket.id, uName!, Number(wins), sessionId);

  useEffect(() => {
    players.push(uName!);
    //restart();
    if (Boolean(Number(host))) {
      const time = queryParameters.get("time");
      const pnum = queryParameters.get("pnum");

      createNewGame(creator, Number(time), Number(pnum));
      setConditions(["Код сессии: " + sessionId + ". Ожидаем игроков", ...conditions]);

    } else {
      setConditions(["Вы успешно подключились. Ожидаем игроков", ...conditions]);

    }

    if(!Boolean(Number(host))){
      socket.on("passingPlayersList", (newPlayers) => {

        setPlayersList(newPlayers);
  
      });
    }

    socket.on("playerConnected", (newPlayer) => {
      //sendDataTonewPlayer(player);
      
      players.push(newPlayer.name);


      let s = `Новый игрок ${newPlayer.name} подключился`;
      setConditions([s, ...conditions]);
    });
    
    socket.once("gameStartsNow", () => {

          if(Boolean(Number(host))){
            socket.emit("whoIsIN", creator.sessionId, players);
          }

          setGameflag(true);

          if(Boolean(Number(host))){

            restart();
          }
          else{
            const newBoard = new Board();
            newBoard.initCells();
            setBoard(newBoard);
          }

        });
    
  }, []);

  let firstMoveDone = false;
  const [players, setPlayersList] = useState<String[]>([]);
  const [gameSatrted, setGameflag] = useState<boolean>(false);
  // const [serverText, setServerText] = useState<string>("");

  const [moveFlag, setMoveFlag] = useState<boolean>(true);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);

  function click(cell: Cell) {
    if (moveFlag) {
      backupBoard = new Board();
      let id = 0;

      for (let i = 0; i < 8; i++) {
        const row: Cell[] = [];
        for (let j = 0; j < 23; j++) {
          row.push(
            new Cell(j, i, board.cells[i][j].chip, id, j == 4 || j == 9)
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
            new Cell(j, i, board.cells[i][j].chip, id, j == 4 || j == 9)
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

  function getMyPlayingID(): number{
    for(let i = 0; i < players.length; i++){
      if(players[i] === uName){
        return i;
      }
    }
    return -1;
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
      if(board.checkBoardValidity(setErrors)){
        socket.emit("turnFinished", creator.sessionId, getMyPlayingID(), hand.chipsInHand.size);

        
      }
    }

    if (flag) {
      return (
        <div className="sackWrapper">
          <InfoButton
            // content={<img src="./src/assets/sack.svg" />}
            content={<img src="../../src/assets/sack.svg" />}
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

  function restart() {
    const newChipSack = new ChipSack();
    newChipSack.initChips();
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
          gameStarted={gameSatrted}
          text={conditions}
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

        <Timer time={time} func={timeIsUp} />

      </div>
      <HandComponent hand={hand} handClick={handClick} />
    </div>
  );
}
