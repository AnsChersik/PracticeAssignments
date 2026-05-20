import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Requests from "./Components/Requests";
import { Navigate } from "react-router-dom";
import Admin from "./Components/Admin";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (user) {
    if (user.login === "beauty" && user.password) {
      return <Admin user={user} onLogout={handleLogout} />;
    }
    return <Requests user={user} onLogout={handleLogout} />;
  }

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin}></Login>}
        ></Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
