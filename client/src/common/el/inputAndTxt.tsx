import styles from "../styles/inputAndTxt.module.css"

interface InputProps{
    bigText: string;
    lilText: string;
}

export default function inputAndTxt({bigText, lilText}:InputProps) {
    return (
    <div className={styles.inputWrapper}>
        <p className={styles.bigP}>{bigText}</p>
        <p className={styles.lilP}>{lilText}</p>
        <input className={styles.input}></input>
    </div>
    );
}