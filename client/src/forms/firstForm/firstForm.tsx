import Header from "../../common/el/header";
import RumButton from "../../common/el/rumButton";
import InfoButton from "../../common/el/infoButton";
import "./firstForm.css";
import { NavLink } from "react-router-dom";
import DevInformationComponent from "../../common/el/devInformationComponent";

export default function FirstForm() {
  const queryParameters = new URLSearchParams(window.location.search);
  const uName = queryParameters.get("username");
  const wins = queryParameters.get("wins");

  function func() {}

  function showDevInformation() {
    const devInfo = document.querySelector('.dev-info') as HTMLElement;
    if (devInfo != null) {
      devInfo.style.display = "flex";
    }
  }

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

        <DevInformationComponent />

        <div className="bottom-panel">
          <InfoButton content="i" func={func} />

          <InfoButton content="?" func={showDevInformation} />
        </div>
      </div>
    </>
  );
}
