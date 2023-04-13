import {Link, useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import axios from "axios";

export default function UserDetails() {
    const [userData, setUserData] = useState("");
    useEffect( () => {
        fetch( "http://localhost:5000/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Acess-Control-Allow-Origin": "*",
            },
            //token bch tet7at f local storage
            body: JSON.stringify( {
                token:window.localStorage.getItem("token"),
            } ),
        } )
            .then( ( res ) => res.json() )
            .then( ( data ) => {
                console.log( data, "userData" );
                setUserData(data.data);
            } ).catch( ( error ) => {
                console.log( error);
            });
    },[] );
    return (
      <div>
        Name <h1>{userData.firstName}</h1>
        Email<h1>{userData.email}</h1>
      </div>
    );
}