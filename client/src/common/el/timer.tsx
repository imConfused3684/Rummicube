import styles from "../styles/timer.module.css";
import { useEffect, useState } from "react";

interface TimerProp {
  time: number;
  func: () => void;

}

export default function CountdownTimer({ time, func }: TimerProp) {
  const [countdown, setCountdown] = useState(time); // начальное значение

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) =>
        prevCountdown > 0 ? prevCountdown - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer); // очистка таймера при размонтировании компонента
  }, []); // пустой массив зависимостей для запуска эффекта только один раз

  useEffect(() => {
    if (countdown === 0) {
      func(); // вызываем функцию, когда таймер достигает нуля
    }
  }, [countdown, func]);

  return <div className={styles.timer}>{countdown}</div>;
}
