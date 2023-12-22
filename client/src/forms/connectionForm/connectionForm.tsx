import Header from '../../common/el/header'
import RumButton from '../../common/el/rumButton'
import Input from '../../common/el/inputAndTxt'
import "../authorizationForm/authorizationForm.css"
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import {Player, socket, playerConnects} from "../../common/el/models/player"

export default function connectionForm() {
  const navigate = useNavigate();

  const [sessionId, setSessionId] = useState<string>("");

  const queryParameters = new URLSearchParams(window.location.search);
  const uName = queryParameters.get("username");
  const wins = queryParameters.get("wins");

  let player = new Player(socket.id, uName!, Number(wins));

  function connectFunc(){ 
    console.log(sessionId);
    //navigate(`/game/?username=${username}&wins=${wins}&host=false`);

    if (sessionId === "") {
      alert("Введите код сессии");
      return;
    }

    player.sessionId = sessionId;

    playerConnects(player);

    socket.on("error", (message) => {
        alert(message);
        return;
    });

    // redirect only after first player got 'playerConnected' event
    socket.once("connectedToServer", () => {
        navigate(`/game/?username=${uName}&wins=${wins}&host=0&sesid=${sessionId}`);
    });
  }


    return (
      <div className="card">
      <Header 
        username={uName!}
        rating={Number(wins!)}
      />
      <Input
        bigText='Введите код комнаты:'
        lilText=''
        onChange={setSessionId}
      />
      <RumButton text={"Подключиться"} func={connectFunc} />

      
    </div>
    );
}