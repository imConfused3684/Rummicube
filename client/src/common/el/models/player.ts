import  io  from "socket.io-client";

export const socket = io("http://localhost:6284/");

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