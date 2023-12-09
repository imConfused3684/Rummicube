import Header from "../../common/el/header";
import RumButton from "../../common/el/rumButton";
import Input from "../../common/el/inputAndTxt";
import "./registrationForm.css";
import { NavLink } from "react-router-dom";


export default function registrationForm() {
  function func() {}

  return (
    <div className="card">
      <Header username="ASSer" rating={1000} />
      <Input
        bigText="Придумайте логин"
        lilText="от 4 до 16 латинских букв, цифр и подчёркиваний"
      />
      <Input
        bigText="Введите пароль"
        lilText="от 4 до 16 латинских букв, цифр и подчёркиваний"
      />
      <NavLink to="/main">
        <RumButton text={"Зарегистрироваться"} func={func} />
      </NavLink>

      <NavLink to="/">
        <span className="or-authorize">или авторизоваться</span>
      </NavLink>
    </div>
  );
}
