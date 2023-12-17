import Header from "../../common/el/header";
import RumButton from "../../common/el/rumButton";
import InfoButton from "../../common/el/infoButton";
import "./firstForm.css";
import { NavLink } from "react-router-dom";

export default function FirstForm() {
  const queryParameters = new URLSearchParams(window.location.search);
  const uName = queryParameters.get("username");
  const wins = queryParameters.get("wins");

  function func() {}

  return (
    <>
      <div className="card">
        <Header username={uName!} rating={Number(wins!)} />

        <h1 id="rummyTitle">Руммикуб</h1>

        <NavLink to="/room-customization">
          <RumButton text="Создать игру" func={func} />
        </NavLink>

        <NavLink to="/connection">
          <RumButton text="Подключиться к игре" func={func} />
        </NavLink>

        <div className="bottom-panel">
          <InfoButton content="i" func={func} />

          <InfoButton content="?" func={func} />
        </div>
      </div>
    </>
  );
}
