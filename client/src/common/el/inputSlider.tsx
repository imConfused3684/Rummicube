import styles from "../styles/inputSlider.module.css";
import { useState } from "react";

interface InputProps {
  name: string;
  min: number;
  max: number;
  value: number;
  step: number;
  label: string;
}

export default function InputSlider({
  name,
  min,
  max,
  value,
  step,
  label,
}: InputProps) {
  const [val, setValue] = useState(value);

  const handleSliderChange = (event: { target: { value: any } }) => {
    setValue(event.target.value);
  };

  return (
    <div className={styles.inputSliderWrapper}>
      {/* <h2>{val}</h2> */}
      <label className={styles.label} htmlFor={name}>
        {label}: {val}
      </label>
      <div className={styles.sliderWithNums}>
        <span className={styles.span}>{min}</span>
        <input
          className={styles.input}
          type="range"
          name={name}
          id={name}
          min={min}
          max={max}
          value={val}
          step={step}
          onChange={handleSliderChange}
        />
        <span className={styles.span}>{max}</span>
      </div>
    </div>
  );
}
