import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Layout from "./pages/_Layout";
import Login from "./pages/Login";
import { useEffect } from "react";
import api from "./app/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "./features/authSlice";
function App() {
  const dispatch = useDispatch();
  useEffect((next) => {
    let isMount = true;
    if (isMount) {
      const fetchData = async () => {
        const result = await api.post("/auth/refresh");

        console.log("🚀 -> file: App.js:15 -> result?.data:", result?.data);
        dispatch(setCredentials({}));
      };
      fetchData();
      return next;
    }
    return (isMount = false);
  }, []);
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
