import "../styles/conditions.css";

interface conditionProps {
  conditions: string[];
}

export default function ConditionComponent({ conditions }: conditionProps) {
  return (
    <div className="conditions-block">
      {conditions.map((condition, index) => (
        <p key={index}>{condition}</p>
      ))}
    </div>
  );
}
