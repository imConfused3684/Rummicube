import Header from "../../common/el/header";
import RumButton from "../../common/el/rumButton";
import InfoButton from "../../common/el/infoButton";
import { useState } from "react";
import "./firstForm.css";
import { NavLink } from "react-router-dom";

export default function FirstForm() {
  const [count, setCount] = useState(0);

  function func() {
    setCount((count) => count + 1);
  }

  return (
    <>
      <div className="card">
        <Header username="USer" rating={1000} />

        <h1 id="rummyTitle">Руммикуб</h1>

        <NavLink to="/room-customization">
          <RumButton text="Создать игру" func={func} />
        </NavLink>

        <NavLink to="/connection">
          <RumButton text="Подключиться к игре" func={func} />
        </NavLink>

        <div className="bottom-panel">
          <InfoButton text="i" func={func} />

          <InfoButton text="?" func={func} />
        </div>
      </div>
    </>
  );
}
