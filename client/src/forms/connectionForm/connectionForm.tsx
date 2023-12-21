import Header from '../../common/el/header'
import RumButton from '../../common/el/rumButton'
import Input from '../../common/el/inputAndTxt'
import "../authorizationForm/authorizationForm.css"
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import  io  from "socket.io-client";

export default function connectionForm() {
  const navigate = useNavigate();

  const [sessionId, setSessionId] = useState<string>("");

  function connectFunc(){ 
    console.log(sessionId);
    //navigate(`/game/?username=${username}&wins=${wins}&host=false`);
  }


  const queryParameters = new URLSearchParams(window.location.search);
  const uName = queryParameters.get("username");
  const wins = queryParameters.get("wins");

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