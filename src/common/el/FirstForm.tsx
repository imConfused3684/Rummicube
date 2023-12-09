import Header from './header'
import RumButton from './rumButton'
import { useState } from 'react'
import "../styles/FirstForm.css"


export default function FirstForm() {
    const [count, setCount] = useState(0)

    function func(){
      setCount((count) => count + 1);
    }

    return (
    <>
    
    <div className="card">
      <Header 
        username='USer'
        rating={1000}
      />

      <h1>Руммикуб</h1>
      
      <RumButton 
        text = {`Penis size is ${count} inches`}
        func = {func}
      />
    </div>
    </>
    );
}