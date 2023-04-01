import {Route, Routes, Navigate, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css"

function App() {
  const user = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          {user && <Route path="/" exact element={<Home />} />}
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
