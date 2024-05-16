import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage'
import KeuanganPage from './pages/keuanganPage'
import BeratBadanPage from './pages/beratBadanPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/keuangan' element={<KeuanganPage/>} />
        <Route path='/bb' element={<BeratBadanPage/>}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
