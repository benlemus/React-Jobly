import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Companies from "./Companies";
import CompanyDetails from "./CompanyDetails";
import Jobs from "./Jobs";
import Login from "./Login";
import Signup from "./Signup";
import api from "../../api";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "./Profile";
import ProfileUpdate from "./ProfileUpdate";

function App() {
  const [token, setToken] = useState(() => {
    const t = localStorage.getItem("jobly-token");
    if (t) {
      api.token = t;
      return t;
    }
    return null;
  });

  const [curUser, setCurUser] = useState(null);

  useEffect(() => {
    async function decodeToken() {
      if (!token) return null;
      try {
        const { username } = jwtDecode(token);
        const userData = await api.getCurrentUser(username);
        setCurUser(userData);
      } catch (err) {
        console.warn("Invalid token", err);
        setCurUser(null);
      }
    }
    decodeToken();
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("jobly-token", token);
      api.token = token;
    } else {
      localStorage.removeItem("jobly-token");
      api.token = null;
    }
  }, [token]);

  async function login(data) {
    const token = await api.login(data);
    api.token = token;
    const { username } = jwtDecode(token);
    const userData = await api.getCurrentUser(username);
    setToken(token);
    setCurUser(userData);
  }

  async function signup(data) {
    const token = await api.signup(data);
    api.token = token;
    const { username } = jwtDecode(token);
    const userData = await api.getCurrentUser(username);
    setToken(token);
    setCurUser(userData);
  }

  async function logout() {
    await api.logout();
    setToken(null);
    setCurUser(null);
  }

  async function updateProfile(data) {
    try {
      const updatedUser = await api.updateProfile(curUser.username, data);
      refreshUser(updatedUser);
      return updatedUser;
    } catch (err) {
      console.error("Profile update failed", err);
      throw err;
    }
  }

  async function apply(jobId) {
    const applied = await api.applyToJob(curUser.username, jobId);
    refreshUser({
      ...curUser,
      applications: [...curUser.applications, applied],
    });
  }

  function refreshUser(updatedUser) {
    setCurUser(updatedUser);
  }

  return (
    <div className="App">
      <Navbar logout={logout} curUser={curUser} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home curUser={curUser} />} />

          <Route
            path="/companies"
            element={
              <ProtectedRoute curUser={curUser} token={token}>
                <Companies />
              </ProtectedRoute>
            }
          />
          <Route
            path="/companies/:handle"
            element={
              <ProtectedRoute curUser={curUser} token={token}>
                <CompanyDetails apply={apply} curUser={curUser} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute curUser={curUser} token={token}>
                <Jobs apply={apply} curUser={curUser} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute curUser={curUser} token={token}>
                <Profile curUser={curUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/update"
            element={
              <ProtectedRoute curUser={curUser} token={token}>
                <ProfileUpdate
                  curUser={curUser}
                  updateProfile={updateProfile}
                />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup signup={signup} />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
