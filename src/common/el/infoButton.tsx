import styles from "../styles/infoButton.module.css"

interface infoButtonProps{
    text: string;
    func: () => void;
}

export default function infoButton({text, func}:infoButtonProps) {
    return (<button className={styles.button} onClick={func} >{text}</button>);
}