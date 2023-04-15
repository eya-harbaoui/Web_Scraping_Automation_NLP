import {Route, Routes, Navigate, BrowserRouter} from "react-router-dom";
import  Welcome from "./pages/welcome"
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import { ToastContainer } from "react-toastify";
import "./App.css"
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isLoggedIn = window.localStorage.getItem( "loggedIn" );
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>

          <Route
            path="/"
            exact
            element={isLoggedIn == "true" ? <UserDetails /> : <Login />}
          />
          <Route path="/welcome" exact element={<Welcome/>}></Route>
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          {<Route path="/userDetails" element={<UserDetails />} />}
        </Routes>
      </div>
      <ToastContainer position="top-center"></ToastContainer>
    </BrowserRouter>
  );
}

export default App;
