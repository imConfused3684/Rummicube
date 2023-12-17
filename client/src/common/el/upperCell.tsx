import "../styles/board.css";

interface upperCellProps {
    num: number;
}

export default function UpperCell({num}: upperCellProps) {
    return <div className="upper-cell">{num}</div>
}