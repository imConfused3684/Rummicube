import Header from "../../common/el/header";
import RumButton from "../../common/el/rumButton";
import InfoButton from "../../common/el/infoButton";
import "./firstForm.css";

import DevInformationComponent from "../../common/el/devInformationComponent";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

export default function FirstForm() {
  const queryParameters = new URLSearchParams(window.location.search);
  const uName = queryParameters.get("username");
  const wins = queryParameters.get("wins");
  const exit = queryParameters.get("exit");
  const navigate = useNavigate();

  function func() {}

  function showDevInformation() {
    const devInfo = document.querySelector('.dev-info') as HTMLElement;
    if (devInfo != null) {
      devInfo.style.display = "flex";
    }
  }

  const showSystemInfo = () => {
    window.open('/system-info', '_blank');
  }

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

  if (exit != null) {
    alert(`Игрок ${exit} вышел, сесия была распущена`);
  }

  return (
    <>
      <div className="card">
        <Header username={uName!} rating={Number(wins!)} />

        <h1 id="rummyTitle">Руммикуб</h1>

        <RumButton text="Создать игру" func={goToRoomCustomizationForm} />

        <RumButton text="Подключиться к игре" func={goToConnectionForm} />

        <DevInformationComponent />

        <div className="bottom-panel">
          <InfoButton content="i" func={showSystemInfo} />

          <InfoButton content="?" func={showDevInformation} />
        </div>
      </div>
    </>
  );
}
