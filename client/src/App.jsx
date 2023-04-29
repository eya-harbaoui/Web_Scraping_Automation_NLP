import {Route, Routes, Navigate, BrowserRouter} from "react-router-dom";
import  Home from "./pages/welcome/Home";
import About from "./pages/welcome/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import { ToastContainer } from "react-toastify";
import "./App.css"
import "react-toastify/dist/ReactToastify.css";
import Reset from "./pages/Reset";

function App() {
  const isLoggedIn = window.localStorage.getItem( "loggedIn" );
  return (
    <BrowserRouter>
      <div className="container">
        
        <Routes>
          <Route path="/" exact element={<Home/>}></Route>
          <Route path="/About" exact element={<About/>}></Route>
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          {<Route path="/userDetails" element={<UserDetails />} />}
          <Route path="/reset" exact element={<Reset />} />
        </Routes>
      </div>
      <ToastContainer position="top-center"></ToastContainer>
    </BrowserRouter>
  );
}

export default App;
