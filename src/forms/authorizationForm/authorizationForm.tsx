import Header from '../../common/el/header'
import RumButton from '../../common/el/rumButton'
import Input from '../../common/el/inputAndTxt'
import "./authorizationForm.css"

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