import {Link, useNavigate} from "react-router-dom";
import styles from "./styles.module.css";
import {useState} from "react";
import React from "react";
import axios from "axios";

function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  /*const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };*/
  //The main advantage of using an async function in React is that it allows you to use the await keyword 
  //to wait for asynchronous operations to complete, such as fetching data from an API or performing an expensive computation.
  const handleSubmit = (e) => {
    console.log(email, password);
    e.preventDefault();
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Acess-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log( data, "userRegister" );
        if ( data.status == "ok" ) {
          alert( "login successful" );
          window.localStorage.setItem( "token", data.data );
          window.localStorage.setItem("loggedIn", true); //onclick aal login var set to true

          window.location.href = "./userDetails";
      }
      });
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
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Password"
            required
          />
          {error && <div className={styles.error_msg}> {error}</div>}
          <button type="submit" className={styles.btn} >
            Log In
          </button>
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
