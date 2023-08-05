import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignupPage from "./components/Signup/SignupForm";
import LoginPage from "./components/Login/LoginForm";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import HeadTail from "./components/HeadTail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const islogin = useSelector((state) => state.user.islogin);
  return (
    <>
      <div className="main-app">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={
                <>
                  <Navbar />
                  {islogin ? <Home /> : <Navigate to="/login" />}
                </>
              }
            />
            <Route
              path="/about"
              element={
                <>
                  <Navbar />
                  {islogin ? <About /> : <Navigate to="/login" />}
                </>
              }
            />
            <Route
              path="/head-tail"
              element={
                <>
                  <Navbar />
                  {islogin ? <HeadTail /> : <Navigate to="/login" />}
                </>
              }
            />
            <Route
              path="/signup"
              element={!islogin ? <SignupPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!islogin ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
