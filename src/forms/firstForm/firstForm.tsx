import Header from '../../common/el/header'
import RumButton from '../../common/el/rumButton'
import { useState } from 'react'
import "./firstForm.css"


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