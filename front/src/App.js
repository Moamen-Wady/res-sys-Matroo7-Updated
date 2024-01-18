import React from 'react'
import ProjX from './proj'
import Dashboard from './dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
export default function App() {
    return (
        <Router>
            <Routes >
                <Route path='/' element={ <ProjX /> } />
                <Route path='/dbrd' element={ <Dashboard /> } />
            </Routes>
        </Router>
    )
}
