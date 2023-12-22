import "../styles/conditions.css";
import RumButton from "./rumButton";

interface conditionProps {
  conditions: string[];
  start: boolean;
  func: () => void;
}

export default function ConditionComponent({ conditions, start, func }: conditionProps) {
  if(!start){
    return (
      <div className="conditions-block">
        {conditions.map((condition, index) => (
          <p key={index}>{condition}</p>
        ))}
      </div>
    );
  }
  else{
    return( <RumButton text={"Начать"} func={func}/>)
  }
}
