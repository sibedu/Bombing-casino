import { useState } from 'react'
import './App.css'
import PanelControl from './components/PanelControl'
import Tablero from './components/Tablero'


function App() {

  return (
    <div className=" min-h-screen bg-black flex flex-wrap justify-center gap-12 items-center" style={{backgroundImage:'url("https://www.transparenttextures.com/patterns/dark-denim-3.png")'}}>
     <PanelControl />
     <Tablero /> 
     
    </div>
  )
}

export default App
