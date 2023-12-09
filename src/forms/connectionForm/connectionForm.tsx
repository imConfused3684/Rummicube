import Header from '../../common/el/header'
import RumButton from '../../common/el/rumButton'
import Input from '../../common/el/inputAndTxt'
import "../authorizationForm/authorizationForm.css"

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