import Header from '../../common/el/header'
import RumButton from '../../common/el/rumButton'
import Input from '../../common/el/inputAndTxt'
import "../authorizationForm/authorizationForm.css"
import { NavLink } from "react-router-dom";

export default function connectionForm() {

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
      <NavLink to="/game">
        <RumButton text={"Подключиться"} func={()=>{}} />
      </NavLink>

      
    </div>
    );
}