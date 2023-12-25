import styles from "../styles/timer.module.css";

interface TimerComponentProps {
  time: number;
}

export default function CountdownTimer({ time }: TimerComponentProps) {

  return (
    <div className={styles.timer}>{time}</div>
  );
}
