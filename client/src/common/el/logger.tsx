import React, { useEffect, useState } from "react";
import "../styles/logger.css";

interface LoggerProps {
  errors: string[];
}

export default function Logger({ errors }: LoggerProps) {
 

  return (
    <div className="logger">
      {errors.map((error, index) => (
        <p key={index}>{error}</p>
      ))}
    </div>
  );
}
