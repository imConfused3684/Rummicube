class Game {
    io;
    socket;
    currentSessions = []; // all active socket connections
    currentRoom;

    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.currentRoom = "";
        this.currentSessions.push(socket);
    }

    initializeGame() {
        this.socket.on("createNewGame", (player, time, pnum) => this.onCreateNewGame(player, time, pnum));

        this.socket.on("playerConnects", (player) => this.onPlayerConnects(player));

        this.socket.once("whoIsIN", (sessionId, players) => this.onwhoIsIN(sessionId, players));

        this.socket.once("gameStarts", (sessionId) => this.gameStartsNow(sessionId));

        this.socket.on("turnFinished", (sessionId, prevPId, prevPhandSize, boardCells, chipSackChips) => this.turnFinished(sessionId, prevPId, prevPhandSize, boardCells, chipSackChips));
    }

    turnFinished(sessionId, prevPId, prevPhandSize, boardCells, chipSackChips) {
        

        let newId = -1;
        if(Number(prevPId) === this.getRoomPnum(sessionId)-1){
            newId = 0;
        }
        else{
            newId = Number(prevPId) + 1;
        }

        console.log("newId: " + newId)

        if(Number(prevPhandSize) === 0){
            this.socket.to(this.getRoom(sessionId)).emit("heWon", prevPId);
            return;
        }

        this.socket.to(this.getRoom(sessionId)).emit("newTurn", newId, boardCells, chipSackChips);
    }

    gameStartsNow(sessionId) {
        console.log("gameStartsNow " + sessionId);
        this.socket.to(this.getRoom(sessionId)).emit("gameStartsNow");
    }

    onwhoIsIN(sessionId, players) {
        console.log("onwhoIsIN " + sessionId);
        this.socket.to(this.getRoom(sessionId)).emit("passingPlayersList", players);
    }

    onCreateNewGame(player, time, pnum) {

        console.log("Game ID: " + player.sessionId);

        this.socket.join(`${player.sessionId} ${time} ${pnum}`);
        console.log(this.io.sockets.adapter.rooms);

        console.log(`Creator ${player.name} has joined! His socket: ${this.socket.id}`);
    }

    onPlayerConnects(player) {
        let room = this.getRoom(player.sessionId);

        this.currentRoom = room;

        if (!room) {
            console.log("Room with such ID not found!");
            this.socket.emit("error", "Сессия с таким кодом не найдена!");
            return;
        }


        //console.log(this.getRoomPnum(player.sessionId));
        if (this.io.sockets.adapter.rooms.get(room)?.size === Number(this.getRoomPnum(player.sessionId))) {
            console.log("You cannot join. There's already enough players");
            this.socket.emit("error", "Данная сессия уже переполнена!");
            return;
        }

        this.socket.join(room);

        // emit event that notifies another player that second player connected
        this.socket.to(room).emit("playerConnected", player);
        this.socket.emit("connectedToServer");

        console.log(`Player ${player.name} has joined! His socket: ${this.socket.id}`);

        console.log(this.io.sockets.adapter.rooms);

        if (this.io.sockets.adapter.rooms.get(room)?.size === Number(this.getRoomPnum(player.sessionId))) {
            this.socket.to(room).emit("uCanStart");
            // this.socket.to(room).emit("gameStartsNow");
            // this.socket.emit("gameStartsNow");
        }
    }

    getRoom(sessionId) {
        let result;

        for (let room of this.io.sockets.adapter.rooms.keys()) {

            let roomArgs = room.split(' ');

            if (roomArgs[0] === sessionId) {
                result = room;
            }
        }

        return result;
    }

    getRoomPnum(sessionId) {
        let result;

        for (let room of this.io.sockets.adapter.rooms.keys()) {

            let roomArgs = room.split(' ');

            if (roomArgs[0] === sessionId) {
                result = roomArgs[2];
            }
        }

        return result;
    }
}

export default Game;