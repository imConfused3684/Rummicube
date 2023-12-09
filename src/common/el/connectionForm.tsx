import Header from './header'
import RumButton from './rumButton'
import Input from './inputAndTxt'
import "../styles/authorizationForm.css"

export default function connectionForm() {

    function func(){}

    return (
      <div className="card">
      <Header 
        username='USer'
        rating={1000}
      />
      <Input
        bigText='Введите код комнаты:'
        lilText=''
      />
      <RumButton 
        text = {"Подключиться"}
        func = {func}
      />
      
    </div>
    );
}