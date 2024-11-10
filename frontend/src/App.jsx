import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from './components/Loading'; // Import your Loading component
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import JobDescription from './components/JobDescription';
import Companies from './components/adminComponents/Companies';
import CreateCompany from './components/adminComponents/CreateCompany';
import CompanySetup from './components/adminComponents/CompanySetup';
import AdminJobs from "./components/adminComponents/AdminJobs"
import PostJob from "./components/adminComponents/PostJob";
import Applicants from "./components/adminComponents/Applicants";
import Footer from "./shared/Footer";



function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Description/:id" element={<JobDescription />} />

        {/* All admin routes from here */}
        <Route path="/admin/companies" element={<Companies />} />
        <Route path="/admin/companies/create" element={<CreateCompany />} />
        <Route path="/admin/companies/:id" element={<CompanySetup />} />
        <Route path="/admin/jobs" element={<AdminJobs/>} />
        <Route path="/admin/jobs/create" element={<PostJob/>} />
        <Route path="/admin/jobs/:id/applicants" element={<Applicants/>} />
      
      </Routes>
      
    </Router>
    
  );
}

export default App;
