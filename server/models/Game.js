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


        console.log(this.getRoomPnum(player.sessionId));
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