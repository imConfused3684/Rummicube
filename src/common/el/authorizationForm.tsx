import Header from './header'
import RumButton from './rumButton'
import Input from './inputAndTxt'
import "../styles/authorizationForm.css"

export default function authorizationForm() {

    function func(){}

    return (
      <div className="card">
      <Header 
        username='USer'
        rating={1000}
      />
      <Input
        bigText='Введите логин'
        lilText=''
      />
      <Input
        bigText='Введите пароль'
        lilText=''
      />
      <RumButton 
        text = {"Вход"}
        func = {func}
      />
      
    </div>
    );
}