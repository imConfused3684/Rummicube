import "../styles/devInformationComponent.css";

export default function DevInformationComponent() {

function closeForm() {
    const devInfo = document.querySelector('.dev-info') as HTMLElement;
    if (devInfo != null) {
      devInfo.style.display = "none";
    }
}

  return (
    <>
      <div className="dev-info">
        <button className="close-form" onClick={closeForm}></button>
        <h1>Руммикуб</h1>
        <div className="information">
          <h2>Сведения о разарботчиках</h2>
          <p>Самаский университет</p>
          <p>Кафедра программных систем</p>
          <p>Курсовой проект по дисциплине Программная инженерия</p>
          <p>Тема проекта: «Приложение «Игра «Руммикуб»</p>
          <p>Разарботчики (студенты группы 6415-020302D):</p>
          <p>Борисов Д.А.</p>
          <p>Григорьев О.М.</p>
          <p>Лялин Г.А.</p>
        </div>
        <p>Самара 2023</p>
      </div>
    </>
  );
}
