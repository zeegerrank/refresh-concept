import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Layout from "./pages/_Layout";
import Login from "./pages/Login";
import axios from "axios";
function App() {
  axios.defaults.baseURL = "http://localhost:3500/api";
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
