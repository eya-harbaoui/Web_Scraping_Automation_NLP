import {Link} from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";

function Signup() {
  const [data, setData] = useState( {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  
  } );
  /*const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/auth/google/callback`,
      "_self"
    );
  };*/
  const handleChange = ( { currentTarget: input } ) => {
    setData( { ...data, [input.name]: input.value } );
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Sign up Form</h1>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/signup.jpg" alt="signup" />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Create Account</h2>
          <input type="text" name="firstname" value={data.firstName } className={styles.input} placeholder="First Name" onChange={handleChange} required/>
          <input type="text" name="lastname" value={data.lastName} className={styles.input} placeholder="Last Name" onChange={handleChange} required/>
          <input type="email" name="email" value={data.email} className={styles.input} placeholder="Email " onChange={handleChange} required/>
          <input
            type="password"
            className={styles.input}
            value={data.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button className={styles.btn}>Sign Up</button>
          <p className={styles.text}>or</p>
          <button className={styles.google_btn} onClick={googleAuth}>
            <img src="./images/google.png" alt="google icon" />
            <span>Sign up with Google</span>
          </button>
          <p className={styles.text}>
            Already Have Account ? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
