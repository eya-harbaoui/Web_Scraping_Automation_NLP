import React, { Component,useState } from "react";
import styles from "../Login/styles.module.css";
export default function Reset() {
    const [email, setEmail] = useState( "" );
const handleSubmit = (e) => {
  console.log( email);
  e.preventDefault();
  fetch("http://localhost:5000/forgot-password", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Acess-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
        console.log( data, "userRegister" );
        alert( data.status );
    });
    };
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Forgot Password ?</h1>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <div className={styles.right}>
          <h2 className={styles.from_heading}>Enter your mail to receive the code</h2>
          <input
            type="email"
            name="email"
            className={styles.input}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="d-grid">
            <button type="submit" className={styles.btn}>
              Submit
            </button>
          </div>
          <p className={styles.text}>
            <a href="/signup">Sign up</a>
                    </p>
                    </div>
        </form>
      </div>
    );
 }