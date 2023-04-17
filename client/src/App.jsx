import {Route, Routes, Navigate, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import "./App.css"
import Reset from "./pages/Reset";

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
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          {<Route path="/userDetails" element={<UserDetails />} />}
          <Route path="/reset" exact element={<Reset />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
