import RumButton from "../../common/el/rumButton";
import Input from "../../common/el/inputAndTxt";
import "./registrationForm.css";
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { register, userCount } from "../../common/service/userService";

export default function registrationForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function func() {
    const regex = /^[a-zA-Z0-9_]{4,16}$/;
    
    if(regex.test(username) && regex.test(password)){
      const response = await userCount(username,password);

      if(Number(response.count) == 0){
        await register(username, password);
        navigate(`/main/?username=${username}&wins=${0}`);
      }
      else{
        alert("Пользователь с таким именем уже существует");
      }

      
    }
    else{
      alert("Имя пользователя или пароль не удоволетворяют требованиям");
    }
    
  }

  return (
    <div className="card">
      <Input
        bigText="Придумайте логин"
        lilText="от 4 до 16 латинских букв, цифр и подчёркиваний"
        onChange={setUsername}
      />
      <Input
        bigText="Введите пароль"
        lilText="от 4 до 16 латинских букв, цифр и подчёркиваний"
        onChange={setPassword}
      />
      <RumButton text={"Зарегистрироваться"} func={func} />

      <NavLink to="/">
        <span className="or-authorize">или авторизоваться</span>
      </NavLink>
    </div>
  );
}
