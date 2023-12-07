import React from 'react'
import Header from './common/el/header'
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Header />
      <h1>Руммикуб</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Penis size is {count} inches
        </button>
      </div>
    </>
  )
}

export default App
