import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

//Importing Components
import Header from './components/Header'
import Footer from './components/Footer'
import UserTable from './components/UserTable';
import CreateUserPage from './components/CreatUser';
import EditUser from './components/EditUser';
import AirportTable from './components/AirportTable';
import ComingSoon from './components/ComingSoon';


//Importing Pages
import Login from './pages/Login';
import HRDashboard from './pages/HRDashboard';
import ControllerDashboard from './pages/ControllerDashboard';
import Statistics from './pages/Statistics';
import Intro from './pages/Intro';
import CreateAirportPage from './components/CreatAirport';
import EditAirpotPage from './components/EditAirpot';




function App() {
  return (
    <div className="">
      {/* <Header /> */}
      <main className="Routes">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hr-dashboard" element={<HRDashboard />} />
          <Route path="/controller-dashboard/:id" element={<ControllerDashboard />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/users" element={<UserTable />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          <Route path="/airports" element={<AirportTable />} />
          <Route path="/create-airport" element={<CreateAirportPage />} />
          <Route path="/airports/edit/:id" element={<EditAirpotPage />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
