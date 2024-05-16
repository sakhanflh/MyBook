import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage'
import KeuanganPage from './pages/keuanganPage'
import BeratBadanPage from './pages/beratBadanPage'
import CatatanHarian from './pages/catatanHarian'
import LoadingPage from './pages/loadingPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<LoadingPage />} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/keuangan' element={<KeuanganPage/>} />
        <Route path='/bb' element={<BeratBadanPage/>}/>
        <Route path='/catatan' element={<CatatanHarian/>}/>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)
