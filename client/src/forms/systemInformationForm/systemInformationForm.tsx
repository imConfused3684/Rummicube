import "./systemInformationForm.css";
import imgAuth from "../../assets/sys_info_imgs/1.jpg";
import imgReg from "../../assets/sys_info_imgs/2.jpg";
import imgMain from "../../assets/sys_info_imgs/3.jpg";
import imgRoomCustomization from "../../assets/sys_info_imgs/4.jpg";
import imgSessionCreate from "../../assets/sys_info_imgs/5.jpg";
import imgSessionReady from "../../assets/sys_info_imgs/6.jpg";
import imgConnection from "../../assets/sys_info_imgs/7.jpg";
import imgConnectionError from "../../assets/sys_info_imgs/8.jpg";
import imgConnectionSuccess from "../../assets/sys_info_imgs/9.jpg";
import imgPutChip from "../../assets/sys_info_imgs/10.jpg";
import imgBoard from "../../assets/sys_info_imgs/11.jpg";
import imgSortByNum from "../../assets/sys_info_imgs/12.jpg";
import imgSortByColor from "../../assets/sys_info_imgs/13.jpg";
import imgWrongChips from "../../assets/sys_info_imgs/14.jpg";
import imgJoker1 from "../../assets/sys_info_imgs/15.jpg";
import imgJoker2 from "../../assets/sys_info_imgs/16.jpg";
import React, { useEffect } from "react";

export default function SystemInformationForm() {
  useEffect(() => {
    document.title = "Справка о системе - Руммикуб";
  });

  return (
    <>
      <div className="sys-info">
        <h1 className="info">
          Руммикуб
          <br />
          Справочная информация
        </h1>

        <section className="contents">
          <h2 className="info">Оглавление</h2>
          <ul>
            <li>
              <a href="#intro">
                <p>Введение</p>
              </a>
            </li>

            <li>
              <a href="#connection">
                <p>Подключение к игре</p>
              </a>
              <ul>
                <li>
                  <a href="#authorization">
                    <p>Авторизация</p>
                  </a>
                </li>
                <li>
                  <a href="#createSession">
                    <p>Создание игровой сессии</p>
                  </a>
                </li>
                <li>
                  <a href="#joinSession">
                    <p>Присоединение к игровой сессии</p>
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <a href="#gameProcess">
                <p>Игровой процесс</p>
              </a>
              <ul>
                <li>
                  <a href="#board">
                    <p>Игровая доска</p>
                  </a>
                </li>
                <li>
                  <a href="#chipTransition">
                    <p>Перемещение фишек</p>
                  </a>
                </li>
                <li>
                  <a href="#confirmOrCancell">
                    <p>Подтверждение или отмена хода</p>
                  </a>
                </li>
                <li>
                  <a href="#endOfTurn">
                    <p>Завершение хода</p>
                  </a>
                </li>
                <li>
                  <a href="#chipSort">
                    <p>Сортировка фишек</p>
                  </a>
                </li>
                <li>
                  <a href="#joker">
                    <p>Джокер</p>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#exit">
                <p>Выход из программы</p>
              </a>
            </li>
          </ul>
        </section>

        <section id="intro">
          <h2 className="info">Введение</h2>
          <p>
            Приложение «Игра Руммикуб» - это вирутальная версия популярной
            настольной игры для 2-4 игроков.
          </p>
          <p>Данное приложение совместимо со следующими браузерами:</p>
          <ul>
            <li>
              <p>Google Chrome (ver. 121-123);</p>
            </li>
            <li>
              <p>Mozilla Firefox (ver. 122-124);</p>
            </li>
            <li>
              <p>Microsoft Edge (ver. 120);</p>
            </li>
            <li>
              <p>Opera (ver. 104);</p>
            </li>
            <li>
              <p>Safari (ver. 17.3-TP).</p>
            </li>
          </ul>
          <p>Программа использует облачную базу данных Google Firebase.</p>
          <p>
            Система совместима с ОС Windows 7 и выше. Системные требования: 50
            Гб места на диске, 2 Гб оперативной памяти.
          </p>
        </section>

        <section id="connection">
          <h2 className="info">Подключение к игре</h2>
          <section id="authorization">
            <h3 className="info">Авторизация</h3>
            <p>
              Для того, чтобы получить доступ к игре, необходимо авторизоваться
              в приложении. Для этого нужно ввести логин и пароль
              зарегистрированного пользователя.
            </p>
            <img src={imgAuth} alt="" className="sys-info-img" />
            <p>
              Если пользователь не зарегистрирован, он может перейти к форме
              регистрации по нажатии ссылки "или зарегистрироваться".
            </p>
            <img src={imgReg} alt="" className="sys-info-img" />
            <p>
              Для регистрации пользователь должен придумать логин и пароль,
              соответсвующие условиям, показанным на экране.
            </p>
            <p>
              При успешной авторизации или регистрации на экран выведется
              главная экранная форма игры.
            </p>
            <img src={imgMain} alt="" className="sys-info-img-wide" />
          </section>
          <section id="createSession">
            <h3 className="info">Создание игровой сессии</h3>
            <p>
              Для создания игровой сессии необходимо нажать кнопку «Создать
              игру». При нажатии кнопки откроется форма задания параметров
              игровой сессии. При помощи ползунков на экране можно задать время
              хода и количество игроков.
            </p>
            <img
              src={imgRoomCustomization}
              alt=""
              className="sys-info-img-wide"
            />
            <p>
              После задания параметров игровой сессии пользователю необходимо
              нажать кнопку «Готово». На экран выведется форма игровой сессии. В
              центре экрана выведется блок, содержащий уникальный идентификатор
              сессии и сообщение о статусе подключения остальных пользователей к
              игре. Для того, чтобы другой пользователь смог присоединиться к
              игре, ему необходимо передать сгенерированный идентификатор.
            </p>
            <img src={imgSessionCreate} alt="" className="sys-info-img-wide" />
            <p>
              Как только все игроки подключатся, вместо блока с идентификатором
              и статусом подключения на экран всплывет кнопка «Начать».
            </p>
            <img src={imgSessionReady} alt="" className="sys-info-img-wide" />
          </section>
          <section id="joinSession">
            <h3 className="info">Присоединение к игровой сессии</h3>
            <p>
              Для подключения к уже созданной игровой сессии необходимо нажать
              кнопку «Подключиться к игре». При нажатии кнопки откроется форма с
              полем для ввода идентификатора игровой сессии и кнопкой
              «Подключиться».
            </p>
            <img src={imgConnection} alt="" className="sys-info-img-wide" />
            <p>
              Если пользователь ввёл неправильный идентификатор и нажал кнопку
              «Подключиться», на экран выведется сообщение об ошибке.
            </p>
            <img
              src={imgConnectionError}
              alt=""
              className="sys-info-img-small"
            />
            <p>
              Если введенный идентификатор оказался верным, на экран выведется
              форма игровой сессии. В центре экрана выведется блок с сообщением
              об успешном подключении и ожидании остальных игроков.
            </p>
            <img
              src={imgConnectionSuccess}
              alt=""
              className="sys-info-img-wide"
            />
          </section>
        </section>

        <section id="gameProcess">
          <h2 className="info">Игровой процесс</h2>
          <p>
            Как только все игроки подключатся к комнате, начнется игровая
            сессия.
          </p>
          <p>
            Игра длится до тех пор, пока один из игроков не избавится от всех
            фишек в руке или не завершит игру досрочно, нажав кнопку «Выйти».
          </p>
          <p>
            Для того, чтобы выложить фишку на доску, необходимо сначата кликнуть
            на ячейку игрового поля, на которой мы хотим разместить фишку, а
            затем на нужную фишку.
          </p>
          <img src={imgPutChip} alt="" className="sys-info-img-wide" />

          <section id="board">
            <h3 className="info">Игровая доска</h3>
            <p>
              Игровая доска состоит из ячеек, на которые размещаются фишки, и
              состоит из 3-х секций:
            </p>
            <ul>
              <li>
                <p>
                  в первых двух секциях фишки размещаются строго по правилу
                  «Группа».
                </p>
                <p>
                  «Группа» — это набор 3-х или 4-х фишек с одинаковым числом, но
                  разного цвета. Например: черный 7, красный 7, синий 7,
                  оранжевый 7.
                </p>
              </li>
              <li>
                <p>
                  В последней секции фишки размещаются строго по правилу «Ряд».
                </p>
                <p>
                  «Ряд» — это набор 3-х или более последовательных чисел одного
                  цвета. Например: черный 3, 4, 5 и 6.
                </p>
              </li>
            </ul>
            <img src={imgBoard} alt="" className="sys-info-img-wide" />
          </section>

          <section id="chipTransition">
            <h3 className="info">Перемещение фишек</h3>
            <p>
              Игроки стараются выложить на стол как можно больше фишек, делая
              перестановки в уже имеющихся комбинациях и добавляя к ним свои
              фишки. Перестановки можно делать разными способами. Главное, чтобы
              в конце хода на столе не осталось отдельно лежащих фишек.
            </p>
          </section>

          <section id="confirmOrCancell">
            <h3 className="info">Подтверждение или отмена хода</h3>
            <p>
              Для того, чтобы подтвердить ход, игрок должен нажать кнопку «OK».
              Если фишки на столе выложены правильно, то ход будет завершен и
              передан другому игроку. Если какие-то фишки на столе выложены
              неправильно, на экран выведется блок с описанием ошибок.
            </p>
            <img src={imgWrongChips} alt="" className="sys-info-img-auto" />
            <p>
              Для отмены хода игрок должен нажать кнопку «NO». Тогда доска
              вернется в состояние, в котором она была до совершения хода, и все
              фишки, выложенные в течение хода на доску, будут возвращены в
              руку.
            </p>
          </section>

          <section id="endOfTurn">
            <h3 className="info">Завершение хода</h3>
            <p>Ход завершается в трех случаях:</p>
            <ul>
              <li>
                <p>
                  игрок правильно выложил фишки на доску и нажал кнопку «ОК»;
                </p>
              </li>
              <li>
                <p>
                  игрок нажал кнопку мешка. При этом из мешка в руку кладется
                  одна фишка, а ход переходит следующему игроку;
                </p>
              </li>
              <li>
                <p>
                  время, отведенное игроку на ход, истекло. При этом из мешка в
                  руку кладется одна фишка, а ход переходит следующему игроку.
                </p>
              </li>
            </ul>
          </section>

          <section id="chipSort">
            <h3 className="info">Сортировка фишек</h3>
            <p>
              Справа от игровой доски на экране расположены кнопки «789» и
              «777». При нажатии на них фишки в руке отсортируются по номерам в
              порядке возрастания или по цветам соответсвенно.
            </p>
            <img src={imgSortByNum} alt="" className="sys-info-img-wide" />
            <img src={imgSortByColor} alt="" className="sys-info-img-wide" />
          </section>

          <section id="joker">
            <h3 className="info">Джокер</h3>
            <p>
              В игре два джокера. Каждый джокер может заменять собой любую
              фишку, его цвет и число определяются местом джокера в комбинации.
              В группе из трёх фишек джокер может заменить фишку любого
              недостающего цвета.
            </p>
            <p>
              <img src={imgJoker1} alt="" className="sys-info-img-auto" />
            </p>
            <p>
              <img src={imgJoker2} alt="" className="sys-info-img-auto" />
            </p>
          </section>

          <section id="exit">
            <h2 className="info">Выход из программы</h2>
            <p>
              Для того, чтобы выйти из программы, необходимо либо полностью
              закрыть браузер, либо закрыть окно браузера с игрой.
            </p>
            <p>
              Если владелец комнаты вышли из программы во время ожидания
              комнаты, то комната будет удалена, а остальные игроки не смогут к
              ней подключиться.
            </p>
            <p>
              Если игрок вышел из программы во время игровой сессии, его счетчик побед будет уменьшен на 1.
            </p>
          </section>
        </section>
      </div>
    </>
  );
}
