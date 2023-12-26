import "../styles/logger.css";

interface LoggerProps {
  errors: string[];
  top: boolean;
}

export default function Logger({ errors, top }: LoggerProps) {
 
  if(top){
    return (
      <div className="logger2">
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
    );
  }
  else{
    return (
      <div className="logger1">
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
    );
  }
  }
