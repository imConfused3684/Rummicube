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

import { Player, socket, createNewGame, turnFinished } from "../../common/el/models/player";
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

const sessionId = nanoid();
let players: string[] = [];
let permanentChipsInHand: Set<Chip> = new Set<Chip>;

export default function SessionForm() {
  const queryParameters = new URLSearchParams(window.location.search);
  const uName = queryParameters.get("username");
  const wins = queryParameters.get("wins");
  const host = queryParameters.get("host");
  const timeString = queryParameters.get("time");
  const time = timeString ? parseInt(timeString, 10) : 0;

  
  let creator: Player;

  if(Boolean(Number(host))){
    creator = new Player(socket.id, uName!, Number(wins), sessionId);
  }
  else{
    const sesid = queryParameters.get("sesid");
    console.log(sesid);
    creator = new Player(socket.id, uName!, Number(wins), sesid!);
  }

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

    socket.on("heWon", (winnerId, boardCells) => {
      let newBoard = new Board();
      newBoard.cells = boardCells;
      setBoard(newBoard);

      if(players[winnerId] == uName){
        alert("Вы победили!");
      }
      else{
        alert(`Игрок ${players[winnerId]} победил`);
        setWhosTurn(`Игрок ${players[winnerId]} победил`);
      }
    });

    socket.on("newTurn", (newId, boardCells, chipSackChips) => {
      setChipPlaced(false);
      let newBoard = new Board();
      //newBoard.cells = boardCells;


      console.log(boardCells);
      for (let i = 0; i < 8; i++) {
        const row: Cell[] = []
        for (let j = 0; j < 23; j++) {
            // row.push(new Cell(this, j, i, null, j == 4 || j == 9))
            if(boardCells[i][j].chip instanceof Object){
              row.push(new Cell(
                Number(boardCells[i][j].x), 
                Number(boardCells[i][j].y), 
                new Chip(boardCells[i][j].chip.id, boardCells[i][j].chip.color, boardCells[i][j].chip.value)
                , Number(boardCells[i][j].id), 
                boardCells[i][j].isDivider));
            }
            else{
              row.push(new Cell(Number(boardCells[i][j].x), Number(boardCells[i][j].y), null, Number(boardCells[i][j].id), boardCells[i][j].isDivider));
            }
        }
        newBoard.cells.push(row);
    }
    console.log(newBoard.cells);
    setBoard(newBoard);
    setSelectedCell(null);


      //console.log(chipSackChips);
      let newChipSack = new ChipSack();
      
      chipSackChips.forEach((chip: { id: number; color: Colors; value: number; }) => {
        newChipSack.chips.add(new Chip(chip.id, chip.color, chip.value));
      });


      //console.log(newChipSack.chips);
      

      console.log(`newId: ${newId} turn`)
      console.log(`its ${players[newId]} turn`);

      

      if(players[newId] == uName){
        setCanMove(true);

        setWhosTurn(`Сейчас мой ход`);

        console.log("ITS MY TURN. hand: " + permanentChipsInHand.size)
        if(permanentChipsInHand.size == 0){
          console.log("hand init needed");
          
          
          const newHand = new Hand();
          for (let i = 0; i < 14; i++) {
            //getRandomChipToHand(chipSack, newHand);
            newHand.chipsInHand.add(getRandomChip(newChipSack));
          }
          setHand(newHand);
        }
        else{
          let newHand = new Hand();
          newHand.chipsInHand = permanentChipsInHand;
          setHand(newHand);
        }
      }
      else{
        setWhosTurn(`Сейчас ходит ${players[newId]}`);
      }
        
      setChipSack(newChipSack);
    });

    socket.on("uCanStart", ()=>{
      setcanstart(true);
    });

    if(!Boolean(Number(host))){
      socket.on("passingPlayersList", (newPlayers) => {
        console.log(newPlayers);
        players = newPlayers;
        //setPlayersList(players);

        console.log(players);
        
      });
    }

    socket.on("playerConnected", (newPlayer) => {
      //sendDataTonewPlayer(player);
      
      players.push(newPlayer.name);


      let s = `Новый игрок ${newPlayer.name} подключился`;
      setConditions([s, ...conditions]);
    });
    
    socket.once("gameStartsNow", () => {

          // if(Boolean(Number(host))){
          //   console.log(players);
          //   console.log(creator.sessionId);
          //   socket.emit("whoIsIN", creator.sessionId, players);
          // }

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
  //let [players, setPlayersList] = useState<Array<any>>([]);
  const [gameSatrted, setGameflag] = useState<boolean>(false);
  const [chipPlaced, setChipPlaced] = useState<boolean>(false);
  // const [serverText, setServerText] = useState<string>("");

  const [canMove, setCanMove] = useState<boolean>(false);
  const [moveFlag, setMoveFlag] = useState<boolean>(true);
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);

  function click(cell: Cell) {

    if(canMove){
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
      }
  
      if (
        selectedCell &&
        selectedCell != cell &&
        selectedCell.chip?.canMove(cell)
      ) {
        selectedCell.moveChip(cell);
        setSelectedCell(null);
        setMoveFlag(false);

      } else if (selectedCell == cell) {
        setSelectedCell(null);
      } else {
        setSelectedCell(cell);
      }
    }
  }

  function handClick(chip: Chip) {
    if(canMove){
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
      }
  
      if (selectedCell && selectedCell.chip === null) {
        selectedCell.chip = chip;
        hand.chipsInHand.delete(chip);
  
        setSelectedCell(null);
        setHand({ ...hand });
        setChipPlaced(true);

        setMoveFlag(false);
      } else {
        console.log("aasdasds");
      }
    }
  }

  function getMyPlayingID(): number{
    //console.log(players);

    for(let i = 0; i < players.length; i++){
      if(String(players[i]).match(String(uName))){
        return i;
      }
    }
    return -1;
  }

  function funcS(flag: boolean) {
    if(flag){
      // initHand();
      getRandomChipToHand(chipSack, hand);
      setHand({ ...hand }); // Обновите состояние руки

      turnFinished(creator.sessionId, getMyPlayingID(), hand.chipsInHand.size, board.cells, Array.from(chipSack.chips));

      permanentChipsInHand = new Set<Chip>;
        hand.chipsInHand.forEach(chip => {
          permanentChipsInHand.add(chip);
        });

      let newId = 0;
      if(!(getMyPlayingID() == players.length - 1)){
        newId = getMyPlayingID() + 1;
      }

      setWhosTurn(`Сейчас ходит ${players[newId]}`);

      setMoveFlag(true);
      setCanMove(false);
    }
  }

  function MoveOrSack({ flag }: FlagProp) {
    

    function funcNo() {
      setErrors([]);

      setMoveFlag(true);

      setBoard(backupBoard);

      setHand({ ...backupHand });
    }

    function funcOk() {
      if(chipPlaced){
        if(board.checkBoardValidity(setErrors)){
          console.log("my finish id" + getMyPlayingID());
          turnFinished(creator.sessionId, getMyPlayingID(), hand.chipsInHand.size, board.cells, Array.from(chipSack.chips));
  
          permanentChipsInHand = new Set<Chip>;
          hand.chipsInHand.forEach(chip => {
            permanentChipsInHand.add(chip);
          });
  
          let newId = 0;
          if(!(getMyPlayingID() == players.length - 1)){
            newId = getMyPlayingID() + 1;
          }
  
          setWhosTurn(`Сейчас ходит ${players[newId]}`);
  
          setMoveFlag(true);
          setCanMove(false);
  
          if(hand.chipsInHand.size == 0){
            setWhosTurn(`Вы победили!`);
            alert("Вы победили!");
          }

          setErrors([]);
        }
      }
      else{
        setErrors(["Для завершения хода нужно", "выложить фишку из руки!"])
      }
      
    }

    if (flag) {
      return (
        <div className="sackWrapper">
          <InfoButton
            // content={<img src="./src/assets/sack.svg" />}
            content={<img src="../../src/assets/sack.svg" />}
            func={() => funcS(canMove)}
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

  const [canstart, setcanstart] = useState<boolean>(false);
  function startFunc(){
    //console.log(sessionId);
    socket.emit("gameStarts", sessionId);

    console.log(players);
    console.log(creator.sessionId);
    socket.emit("whoIsIN", creator.sessionId, players);

    setGameflag(true);

    restart();

    setCanMove(true);
  }
  
  const [whosTurn, setWhosTurn] = useState<string>("");
  return (
    <div className="card">
      <div className="playing-table">

        <p style={{color: "white", position: "absolute", top: "10px"}}>{whosTurn}</p>

        <BoardComponent
          board={board}
          setBoard={setBoard}
          click={click}
          selectedCell={selectedCell}
          gameStarted={gameSatrted}
          text={conditions}
          start={canstart && Boolean(Number(host))}
          func={() => startFunc()}
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
