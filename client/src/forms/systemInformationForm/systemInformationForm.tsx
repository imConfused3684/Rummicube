import "./systemInformationForm.css";
import imgAuth from '../../assets/sys_info_imgs/1.jpg';
import imgReg from '../../assets/sys_info_imgs/2.jpg';
import imgMain from '../../assets/sys_info_imgs/3.jpg';
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
              </ul>
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
          <p>Система совместима с ОС Windows 7 и выше. Системные требования: 50 Гб места на диске, 2 Гб оперативной памяти.</p>
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
            <p>Если пользователь не зарегистрирован, он может перейти к форме регистрации по нажатии ссылки "или зарегистрироваться".</p>
            <img src={imgReg} alt="" className="sys-info-img" />
            <p>Для регистрации пользователь должен придумать логин и пароль, соответсвующие условиям, показанным на экране.</p>
            <p>При успешной авторизации или регистрации на экран выведется главная экранная форма игры.</p>
            <img src={imgMain} alt="" className="sys-info-img" />
          </section>
          <section id="createSession">
          <h3 className="info">Создание игровой сессии</h3>
          </section>
        </section>
      </div>
    </>
  );
}
