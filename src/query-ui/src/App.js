import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer";
import Login from "./components/login";
import Signup from "./components/signup";
import QueryGrid from "./components/queryGrid/queryGrid";
import QueryForm from "./components/queryForm/queryForm";
import Settings from "./components/Settings/Settings";
import ProfilePage from "./pages/ProfilePage";
import Accounts from "./pages/Accounts";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status
  const logout = () => {
    setIsAuthenticated(false); // Update authentication status to false on logout
  };

  const [selectedView, setSelectedView] = useState('analytics');


  return (
    <Router>
      {!isAuthenticated ? (
        // Redirect to login page if not authenticated
        <Routes>
          <Route
            path="*"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      ) : (
        <>
          <Header selectedView={selectedView} setSelectedView={setSelectedView} onlogout={logout} />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/analytics" element={<QueryGrid />} />
            <Route path="/analytics/profile/:id" element={<ProfilePage />} />
            <Route path="/add-form" element={<QueryForm />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/accounts/profile/:id" element={<Accounts/>}/>
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
