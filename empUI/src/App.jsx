import { useState } from 'react'
import './App.css'

import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import FooterComponenet from './components/FooterComponent'
import HomePageComponent from './components/HomePageComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import EmployeeComponent from './components/EmployeeComponent'
import EditEmployeeComponent from './components/EditEmployeeComponent'


function App() {
  

  return (
    <>
    <BrowserRouter>
    <HeaderComponent />
    <Routes>
      <Route path='/' element={<HomePageComponent />} />
      <Route path='/employees' element={<ListEmployeeComponent />} />
      <Route path='/add-employee' element={<EmployeeComponent />} />
      <Route path='/edit-employee/:id'  element={<EditEmployeeComponent/>}/>

    </Routes>
    <FooterComponenet />
    </BrowserRouter>
    
    </>
  )
}

export default App
