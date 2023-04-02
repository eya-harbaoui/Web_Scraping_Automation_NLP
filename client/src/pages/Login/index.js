import {Link, useNavigate} from "react-router-dom";
import styles from "./styles.module.css";
import {useState} from "react";
import React from "react";
import axios from "axios";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  /*const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };*/
  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]: input.value}); //The object passed to setData uses the spread operator (...data) to copy all the properties of the data object into the new object. This is done to preserve any existing data that was previously set.
  };
  //The main advantage of using an async function in React is that it allows you to use the await keyword 
  //to wait for asynchronous operations to complete, such as fetching data from an API or performing an expensive computation.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const {data: res} = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Log in Form</h1>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/login.jpg" alt="login" />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Members Log in</h2>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={data.email}
            className={styles.input}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={data.password}
            className={styles.input}
            placeholder="Password"
            required
          />
          {error && <div className={styles.error_msg}> {error}</div>}
          <button className={styles.btn}>Log In</button>
          <p className={styles.text}>or</p>
          <button className={styles.google_btn}>
            <img src="./images/google.png" alt="google icon" />
            <span>Sign in with Google</span>
          </button>
          <p className={styles.text}>
            New Here ? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
