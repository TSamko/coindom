/* eslint-disable */
import { useState } from 'react'
import Header from '../header/header.jsx'
import Coin from '../coins/coins.jsx'
import './App.css'

function App() {


  return (
    <>
     <Header/>
     <div className="container">
        <Coin/>
        </div>
    </>
  )
}

export default App
