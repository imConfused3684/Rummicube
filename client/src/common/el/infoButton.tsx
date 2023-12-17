import styles from "../styles/infoButton.module.css"

interface infoButtonProps{
    content: any;
    func: () => void;
}

export default function infoButton({content, func}:infoButtonProps) {
    return (<button className={styles.button} onClick={func}>{content}</button>);
}