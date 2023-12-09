import Header from './header'
import RumButton from './rumButton'
import Input from './inputAndTxt'
import "../styles/authorizationForm.css"

export default function registrationForm() {

    function func(){}

    return (
      <div className="card">
      <Header 
        username='USer'
        rating={1000}
      />
      <Input
        bigText='Придумайте логин'
        lilText='от 4 до 16 латинских букв, цифр и подчёркиваний'
      />
      <Input
        bigText='Введите пароль'
        lilText='от 4 до 16 латинских букв, цифр и подчёркиваний'
      />
      <RumButton 
        text = {"Зарегистрироваться"}
        func = {func}
      />
      
    </div>
    );
}