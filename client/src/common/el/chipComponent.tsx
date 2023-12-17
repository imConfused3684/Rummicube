import "../styles/chip.css";
import { Chip } from "./models/chip";
import { Colors } from "./models/colors";

interface ChipProps {
  chip: Chip;
}

export default function ChipComponent({ chip }: ChipProps) {
  let chipValue;
  if (chip.value === 0) {
    if (chip.color === Colors.BLACK) {
      chipValue = <img src="./src/assets/joker-black.png" />;
    } else {
      chipValue = <img src="./src/assets/joker-red.png" />;
    }
  } else {
    chipValue = chip.value;
  }

  return (
    <div className={["chip", chip.color].join(" ")}>
      {/* <span className="chip-value"></span> */}
      {chipValue}
    </div>
  );
}
