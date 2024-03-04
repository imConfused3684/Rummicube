import  io  from "socket.io-client";

export const socket = io("http://5.230.229.206:6284/");

export class Player {
    socketId: string;
    name: string;
    wins: number;
    sessionId?: string;

    constructor(socketId: string, name: string, wins: number, sessionId?: string) {
        this.socketId = socketId;
        this.name = name;
        this.wins = wins;
        this.sessionId = sessionId;
    }
}

export function playerConnects(player: Player | undefined) {
    socket.emit("playerConnects", player);
}

export function createNewGame(player: Player | undefined, time: number, pnum: number) {
    socket.emit("createNewGame", player, time, pnum);
}

export function turnFinished(sessionId: string | undefined, prevPid: number, prevPhandSize: number, boardCells: any[][], chips: any[]) {
    socket.emit("turnFinished", sessionId, prevPid, prevPhandSize, boardCells, chips);
}

export function iAmUpdatingBoard(sessionId: string | undefined, boardCells: any[][]) {
    socket.emit("iAmUpdatingBoard", sessionId, boardCells);
}