import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../Login/styles.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar2";
export default function UserDetails() {
  const [userData, setUserData] = useState("");
    function logOut() {
      //hné cv ama mochkla ken ena deja logged in w nhel site f page okhra narjaa lel login alors que
        //token mwjoud so we need to handle it we should stay logged in till user clck on logout to kill token
    window.localStorage.clear();
    window.location.href = "./login";
  }
  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Acess-Control-Allow-Origin": "*",
      },
      //token bch tet7at f local storage
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setUserData( data.data );
        if ( data.data == 'token expired' ) {
          //alert( "Token expired login again" );
          toast.error("Token expired login again !");
          window.localStorage.clear();
          window.location.href = "./login";

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.containerr}>
      <Navbar />
        <h1>Account Details</h1>
      
      <img className={styles.profileImage} src="../images/profile.png" alt="profile" />
      <img className={styles.robotImage} src="../images/robotgif.gif" alt="robot" />
      <div className={styles.content}style={{ marginTop: '20px' }}>
      Name<h2>{userData.firstName}</h2>
      Email<h2>{userData.email}</h2>
      </div>
      <br />
    </div>
  );
}