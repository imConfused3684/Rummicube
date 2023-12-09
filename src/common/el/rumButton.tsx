import styles from "../styles/rumButton.module.css"

interface ButtonProps{
    text: string;
    func: () => void;
}

export default function RumButton({text, func}:ButtonProps) {
    return (<button className={styles.button} onClick={func} >{text}</button>);
}