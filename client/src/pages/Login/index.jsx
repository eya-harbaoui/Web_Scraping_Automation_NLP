import {Link, useNavigate} from "react-router-dom";
import styles from "./styles.module.css";
import {useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Input} from "antd";
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
          //alert( "login successful" );
          toast.success("login successful");
          window.localStorage.setItem( "token", data.data );
          window.localStorage.setItem( "loggedIn", true ); //onclick aal login var set to true

          window.location.href = "./userDetails";
        }
        else {
          alert("wrong password");
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
          <Input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Email"
            required
          />
          <Input.Password
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Password"
            required
          />
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
          <p className={styles.text}>
            Forgot Password ? <Link to="/reset">Reset Password</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
