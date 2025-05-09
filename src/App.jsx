import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

//Importing Components
import Header from './components/Header'
import Footer from './components/Footer'
import UserTable from './components/UserTable';
import CreateUserPage from './components/CreatUser';
import EditUser from './components/EditUser';


//Importing Pages
import Login from './pages/Login';
import HRDashboard from './pages/HRDashboard';
import ControllerDashboard from './pages/ControllerDashboard';
import Statistics from './pages/Statistics';
import TestScheduling from './pages/TestScheduling';
import Profile from './pages/Profile';
import Intro from './pages/Intro';




function App() {
  return (
    <div className="">
      <Header />
      <main className="Routes">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hr-dashboard" element={<HRDashboard />} />
          <Route path="/controller-dashboard" element={<ControllerDashboard />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/test-scheduling" element={<TestScheduling />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UserTable />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/create-user" element={<CreateUserPage />} />
          
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
