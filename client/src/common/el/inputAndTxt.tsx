import styles from "../styles/inputAndTxt.module.css"

interface InputProps{
    bigText: string;
    lilText: string;
    onChange: (s: string) => void;
}

export default function inputAndTxt({bigText, lilText, onChange}:InputProps) {
    return (
    <div className={styles.inputWrapper}>
        <p className={styles.bigP}>{bigText}</p>
        <p className={styles.lilP}>{lilText}</p>
        <input 
            className={styles.input} 
            onChange={(e) => onChange(e.target.value)}
            ></input>
    </div>
    );
}