import RumButton from "../../common/el/rumButton";
import Input from "../../common/el/inputAndTxt";
import "./authorizationForm.css";
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { userLogInCheckAndGetUserWins } from "../../common/service/userService";

import  io  from "socket.io-client";
const socket = io("http://localhost:6284/");
  socket.on("connect", () => {
    console.log(socket.id);
  });


export default function authorizationForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function func() {
    const response = await userLogInCheckAndGetUserWins(username,password);

    if(response.wins != null){
      navigate(`/main/?username=${username}&wins=${response.wins}`);
    }
    else{
      alert("Неправильный логин или пароль");
    }
  }

  

  return (
    <div className="card">
      <Input bigText="Введите логин:" lilText="" onChange={setUsername}/>
      <Input bigText="Введите пароль:" lilText="" onChange={setPassword}/>
      
      <RumButton text={"Войти"} func={func} />

      <NavLink to="/registration">
        <span className="or-register">или зарегистрироваться</span>
      </NavLink>
    </div>
  );
}
