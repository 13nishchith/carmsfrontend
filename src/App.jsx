import { useState } from 'react'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import CarsListComponent from './components/CarsListComponent'
import CarsComponent from './components/CarsComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <HeaderComponent/>
        <Routes>
          <Route path='/' element={<CarsListComponent/>}></Route>
          <Route path='/cars' element={<CarsListComponent/>}></Route>
          <Route path='/add-cardetails' element={<CarsComponent/>}></Route>
          <Route path='/update-cardetails/:carId' element={<CarsComponent/>}></Route>
        </Routes>
      <FooterComponent/>
    </BrowserRouter>
    </>
  )
}

export default App
