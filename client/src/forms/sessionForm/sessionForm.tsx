import { winsUpdate } from "../../common/service/userService";

import RumButton from "../../common/el/rumButton";
import InfoButton from "../../common/el/infoButton";
import TimerCompomemt from "../../common/el/timerComponent";

import { Board } from "../../common/el/models/board";
import { ChipSack } from "../../common/el/models/chipSack";
import { Hand } from "../../common/el/models/hand";
import { Chip } from "../../common/el/models/chip";

import "./sessionForm.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import HandComponent from "../../common/el/handComponent";
import BoardComponent from "../../common/el/boardComponent";

import { Colors } from "../../common/el/models/colors";
import { Cell } from "../../common/el/models/cell";
import Logger from "../../common/el/logger";

import { Player, socket, createNewGame, turnFinished, iAmUpdatingBoard } from "../../common/el/models/player";
import { nanoid } from "nanoid";


let duration: number = 180;
let intervalId: any;
let remainingTime: number;
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
let players: any[][] = [];
let permanentChipsInHand: Set<Chip> = new Set<Chip>;

let won: boolean = false;
let gameEnded = false;
let firstMoveDone = false;
export default function SessionForm() {
  function start() {
    remainingTime = duration + 1;

    intervalId = setInterval(() => {
      remainingTime -= 1;
      setCurrentTime(remainingTime);


      if (remainingTime <= 0) {
        stop();
      }
    }, 1000);
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  const navigate = useNavigate();

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
    players.push([uName!, 14]);
    //restart();
    if (Boolean(Number(host))) {

      createNewGame(creator, Number(queryParameters.get("time")), Number(queryParameters.get("pnum")));
      setConditions(["Код сессии: " + sessionId + ". Ожидаем игроков", ...conditions]);

    } else {
      setConditions(["Вы успешно подключились. Ожидаем игроков", ...conditions]);

    }

    socket.on("someoneOut", (hisId)=>{
      navigate(`/main/?username=${uName}&wins=${Number(wins)}&exit=${players[hisId][0]}`);
    });

    socket.on("someoneUpdatingBoard", (boardCells) => {

      let newBoard = new Board();
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
      setBoard(newBoard);
      setSelectedCell(null);

    });

    socket.on("heWon", (winnerId, boardCells) => {
      let newBoard = new Board();
      newBoard.cells = boardCells;
      setBoard(newBoard);

      if(String(players[winnerId][0]) == uName){
        won = true;
        alert("Вы победили!");
      }
      else{
        alert(`Игрок ${players[winnerId][0]} победил`);
        setWhosTurn(`Игрок ${players[winnerId][0]} победил`);
      }
      gameEnded = true;
    });

    socket.on("newTurn", (prevPhandSize, newId, boardCells, chipSackChips) => {
      stop();

      players[newId - 1 < 0 ? players.length - 1 : newId - 1][1] = prevPhandSize;
      console.log("UPDATED: ");
      console.log(players);

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
      console.log(`its ${players[newId][0]} turn`);

      

      if(String(players[newId][0]) == uName){
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
        setWhosTurn(`Сейчас ходит ${players[newId][0]}`);
      }
      setChipSack(newChipSack);
      start();
    });

    socket.on("uCanStart", ()=>{
      setcanstart(true);
    });

    if(!Boolean(Number(host))){
      socket.on("passingPlayersList", (newPlayers, timerTime) => {
        duration = timerTime;
        console.log(newPlayers);
        players = newPlayers;
        //setPlayersList(players);

        console.log(players);
        setWhosTurn(`Сейчас ходит ${players[0][0]}`)
      });
    }

    socket.on("playerConnected", (newPlayer) => {
      //sendDataTonewPlayer(player);
      
      players.push([newPlayer.name, 14]);


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

      iAmUpdatingBoard(creator.sessionId, board.cells);
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

      iAmUpdatingBoard(creator.sessionId, board.cells);
    }
  }

  function getMyPlayingID(): number{
    //console.log(players);

    for(let i = 0; i < players.length; i++){
      if(String(players[i][0]).match(String(uName))){
        return i;
      }
    }
    return -1;
  }

  function funcNo() {
    setErrors([]);

    setMoveFlag(true);

    setBoard(backupBoard);

    setHand({ ...backupHand });

    iAmUpdatingBoard(creator.sessionId ,backupBoard.cells);
  }

  function funcS(flag: boolean) {
    if(flag){
      // initHand();
      getRandomChipToHand(chipSack, hand);
      setHand({ ...hand }); // Обновите состояние руки

      turnFinished(creator.sessionId, getMyPlayingID(), hand.chipsInHand.size, board.cells, Array.from(chipSack.chips));
      stop();

      permanentChipsInHand = new Set<Chip>;
        hand.chipsInHand.forEach(chip => {
          permanentChipsInHand.add(chip);
        });

      let newId = 0;
      if(!(getMyPlayingID() == players.length - 1)){
        newId = getMyPlayingID() + 1;
      }

      setWhosTurn(`Сейчас ходит ${players[newId][0]}`);

      setMoveFlag(true);
      setCanMove(false);
    }
  }

  function MoveOrSack({ flag }: FlagProp) {    

    function funcOk() {
      if(chipPlaced){
        if(board.checkBoardValidity(setErrors)){
          console.log("my finish id" + getMyPlayingID());
          turnFinished(creator.sessionId, getMyPlayingID(), hand.chipsInHand.size, board.cells, Array.from(chipSack.chips));
          stop();

          permanentChipsInHand = new Set<Chip>;
          hand.chipsInHand.forEach(chip => {
            permanentChipsInHand.add(chip);
          });
  
          let newId = 0;
          if(!(getMyPlayingID() == players.length - 1)){
            newId = getMyPlayingID() + 1;
          }
  
          setWhosTurn(`Сейчас ходит ${players[newId][0]}`);
  
          setMoveFlag(true);
          setCanMove(false);
  
          if(hand.chipsInHand.size == 0){
            won = true;
            setWhosTurn(`Вы победили!`);
            alert("Вы победили!");
          }

          players[getMyPlayingID()][1] = hand.chipsInHand.size;
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
    duration = time;
    //console.log(sessionId);
    socket.emit("gameStarts", sessionId);

    console.log(players);
    console.log(creator.sessionId);
    socket.emit("whoIsIN", creator.sessionId, players, time);

    setGameflag(true);

    restart();

    setCanMove(true);

    setWhosTurn(`Сейчас мой ход`);

    start();
  }

  async function exitFunc(){
    console.log(won);
    if(won && gameEnded){
      await winsUpdate(uName!, Number(wins) + 1);
      navigate(`/main/?username=${uName}&wins=${Number(wins) + 1}`);
    }else if(gameEnded == true){
      navigate(`/main/?username=${uName}&wins=${Number(wins)}`);
    }
    else{
      socket.emit("imOut", creator.sessionId, getMyPlayingID())
      if(Number(wins) > 0){
        await winsUpdate(uName!, Number(wins) - 1);
      }
      alert("Зафиксированно досрочное покидание сессии, ваш счётчик побед будет уменьшен");
      navigate(`/main/?username=${uName}&wins=${Number(wins) - 1}`);
    }
  }

  function timerIsOver(){
    if(canMove && remainingTime <= 0){
      if(!moveFlag){
        funcNo();
        getRandomChipToHand(chipSack, backupHand);
        setHand(backupHand);
        permanentChipsInHand = backupHand.chipsInHand;
        turnFinished(creator.sessionId, getMyPlayingID(), backupHand.chipsInHand.size, backupBoard.cells, Array.from(chipSack.chips));
      }
      else{
        getRandomChipToHand(chipSack, hand);
        setHand({ ...hand });
        permanentChipsInHand = hand.chipsInHand;
        backupHand = hand;
        turnFinished(creator.sessionId, getMyPlayingID(), hand.chipsInHand.size, board.cells, Array.from(chipSack.chips));
      }
      stop();
  
  
      let newId = 0;
      if(!(getMyPlayingID() == players.length - 1)){
        newId = getMyPlayingID() + 1;
      }
  
      setWhosTurn(`Сейчас ходит ${players[newId][0]}`);
  
      setMoveFlag(true);
      setCanMove(false);

      
  
      players[getMyPlayingID()][1] = hand.chipsInHand.size;
      setErrors([]);
      alert("Время на ход вышло.\nХод передан следующему игроку");
      start();
    }

    if(remainingTime <= 0){
      console.log("TIMER " + canMove);
    }

    console.log("time: " + remainingTime);
  }
  
  
  const [currentTime, setCurrentTime] = useState<number>(0);
  useEffect(() => {timerIsOver()}, [currentTime]);

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
        <div className="exitGameButtWrapper">
          <RumButton text={"Выход"} func={exitFunc} />
        </div>
        

        <Logger errors={errors} />

        <div className="sortButts">
          <InfoButton content="789" func={func789} />
          <InfoButton content="777" func={func777} />
        </div>

        <MoveOrSack flag={moveFlag} />

        <TimerCompomemt time={currentTime} />

      </div>
      <HandComponent hand={hand} handClick={handClick} />
    </div>
  );
}
