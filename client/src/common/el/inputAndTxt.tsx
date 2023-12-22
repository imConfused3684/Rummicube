import styles from "../styles/inputAndTxt.module.css";

interface InputProps {
  bigText: string;
  lilText: string;
  onChange: (s: string) => void;
  isPassword: boolean;
}

export default function inputAndTxt({
  bigText,
  lilText,
  onChange,
  isPassword,
}: InputProps) {
  if (!isPassword) {
    return (
      <div className={styles.inputWrapper}>
        <p className={styles.bigP}>{bigText}</p>
        <p className={styles.lilP}>{lilText}</p>
        <input
            type="text"
          className={styles.input}
          onChange={(e) => onChange(e.target.value)}
        ></input>
      </div>
    );
  } else {
    return (
      <div className={styles.inputWrapper}>
        <p className={styles.bigP}>{bigText}</p>
        <p className={styles.lilP}>{lilText}</p>
        <input
          type="password"
          className={styles.input}
          onChange={(e) => onChange(e.target.value)}
        ></input>
      </div>
    );
  }
}
