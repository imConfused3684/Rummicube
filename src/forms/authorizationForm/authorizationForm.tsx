import Header from "../../common/el/header";
import RumButton from "../../common/el/rumButton";
import Input from "../../common/el/inputAndTxt";
import "./authorizationForm.css";
import { NavLink } from "react-router-dom";

export default function authorizationForm() {
  function func() {}

  return (
    <div className="card">
      <Header username="ASSer" rating={1000} />
      <Input bigText="Введите логин:" lilText="" />
      <Input bigText="Введите пароль:" lilText="" />



      <NavLink to="/main">
        <RumButton text={"Войти"} func={func} />
      </NavLink>

      <NavLink to="/registration">
        <span className="or-register">или зарегистрироваться</span>
      </NavLink>
    </div>
  );
}
