import Header from '../../common/el/header'
import RumButton from "../../common/el/rumButton";
import InputSlider from "../../common/el/inputSlider";
import "./roomCustomizationForm.css";
import { NavLink } from "react-router-dom";

export default function roomCustomizationForm() {
  function func1() {}
  return (
    <div className="card">
      <Header username="USer" rating={1000} />

      <InputSlider
        name="time"
        min={30}
        max={180}
        value={30}
        step={30}
        label="Время хода"
      />
      <InputSlider
        name="players"
        min={2}
        max={4}
        value={3}
        step={1}
        label="Количество игроков"
      />

      <NavLink to="/game">
        <RumButton text={"Готово"} func={func1} />
      </NavLink>
    </div>
  );
}
