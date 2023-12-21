import Header from "../../common/el/header";
import RumButton from "../../common/el/rumButton";
import InfoButton from "../../common/el/infoButton";
import "./firstForm.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

export default function FirstForm() {
  const queryParameters = new URLSearchParams(window.location.search);
  const uName = queryParameters.get("username");
  const wins = queryParameters.get("wins");
  const navigate = useNavigate();

  function func() {}

  function goToRoomCustomizationForm() {
    if (uName != null) {
      navigate(`/room-customization/?username=${uName}&wins=${Number(wins)}`);
    }
  }

  function goToConnectionForm() {
    if (uName != null) {
      navigate(`/connection/?username=${uName}&wins=${Number(wins)}`);
    }
  }

  return (
    <>
      <div className="card">
        <Header username={uName!} rating={Number(wins!)} />

        <h1 id="rummyTitle">Руммикуб</h1>

        <RumButton text="Создать игру" func={goToRoomCustomizationForm} />

        <RumButton text="Подключиться к игре" func={goToConnectionForm} />

        <div className="bottom-panel">
          <InfoButton content="i" func={func} />

          <InfoButton content="?" func={func} />
        </div>
      </div>
    </>
  );
}
