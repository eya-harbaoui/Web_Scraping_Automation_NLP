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
import Main from "./pages/Main/index"
import DemoPage from "./pages/Demo";

function App() {
  const isLoggedIn = window.localStorage.getItem( "loggedIn" );
  // Function to check if the user is logged in
  const isUserLoggedIn = () => {
    return isLoggedIn === "true"; // Change the condition based on how you store the logged-in state
  };
    // Function to render the component or redirect if not logged in
  const renderRoute = (component, path) => {
    if (isUserLoggedIn()) {
      return component;
    } else {
      return <Navigate to="/login" />;
    }
  };
  return (
    <BrowserRouter>
      <div >
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/About" exact element={<About />}></Route>
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          {isUserLoggedIn && <Route path="/userDetails" element={<UserDetails />} />}
          {!isUserLoggedIn && <Route path="/login" exact element={<Login />} />}
         <Route path="/reset" exact element={<Reset />} />
         <Route path="/Main" exact element={renderRoute(<Main />)} />
         <Route path="/Demo" exact element={<DemoPage />} />
        </Routes>
      </div>
      <ToastContainer position="top-center"></ToastContainer>
    </BrowserRouter>
  );
}
export default App;
