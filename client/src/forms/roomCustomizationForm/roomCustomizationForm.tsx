import Header from "../../common/el/header";
import RumButton from "../../common/el/rumButton";
import InputSlider from "../../common/el/inputSlider";
import "./roomCustomizationForm.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function roomCustomizationForm() {
  const queryParameters = new URLSearchParams(window.location.search);
  const uName = queryParameters.get("username");
  const wins = queryParameters.get("wins");
  const navigate = useNavigate();

  function func1() {}

  const [time, setTime] = useState(30); // начальное значение времени
  const [players, setPlayers] = useState(3); // начальное значение количества игроков

  function goToSessionForm() {
    navigate(`/game/?username=${uName}&wins=${Number(wins)}&host=1&time=${time}&pnum=${players}`);
  }

  const handleTimeChange = (newTime: number) => {
    setTime(newTime);
  };

  const handlePlayersChange = (newPlayers: number) => {
    setPlayers(newPlayers);
  };

  return (
    <div className="card">
      <Header username={uName!} rating={Number(wins!)} />

      <InputSlider
        name="time"
        min={30}
        max={180}
        value={30}
        step={30}
        label="Время хода"
        onValueChange={handleTimeChange}
      />
      <InputSlider
        name="players"
        min={2}
        max={4}
        value={3}
        step={1}
        label="Количество игроков"
        onValueChange={handlePlayersChange}
      />

        <RumButton text={"Готово"} func={goToSessionForm} />
    </div>
  );
}
