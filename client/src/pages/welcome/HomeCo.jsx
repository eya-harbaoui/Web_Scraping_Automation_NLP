import {Link, useNavigate} from "react-router-dom";
import React from "react";
import NewsImg from "./news2.png";
import userImg from "./user.jpg";
import nlpImg from "./nlp.png";
import jsonImg from "./json.png";
import {Card, Row, Col, Button} from "antd";
import "./HomeCoStyles.css";
function HomeCo() {
  return (
    <div className="HomeCo">
      <h1>Welcome to web scraping automation</h1>
      <p>
        If you are interested in finance and you want to automate the process of
        web scraping Here is the best place for you !
      </p>
      <div className="divcards">
        <div className="site-card-wrapper" id="about"></div>
      </div>
      <div className="divphotos">
        <div className="divhome1">
          <div className="imgbackground3">
            <img src={NewsImg} alt="image3" />
          </div>
          <div className="hellotext3">
            <h1>Search for finance articles</h1>
            <p>
              Stay ahead of the game with the latest financial news and analysis
              by exploring articles on our website.
            </p>
          </div>
        </div>
        <div className="divhome1">
          <div className="imgbackground2">
            <img src={nlpImg} alt="image2" />
          </div>
          <div className="hellotext2">
            <h1>Get labeled articles</h1>
            <p>
              Looking for a way to quickly analyze finance articles? Look no
              further! Enter the article URL and let our NLP model do the work
              for you.
            </p>
          </div>
        </div>
        <div className="divhome1">
          <div className="imgbackground1">
            <img src={jsonImg} alt="image1" />
          </div>
          <div className="hellotext1" id="login">
            <h1>Save your results in a JSON file</h1>
            <p>you can store the labeled financial articles for future use !</p>
          </div>
        </div>
        <div className="divhome1">
          <div className="imgbackground2">
            <img src={userImg} alt="image1" />
          </div>
          <div className="hellotext3" id="login">
            <h1>Get access to the recent researched articles</h1>
            <p>
              By creating a secure account on our website, you can save your
              latest research and access it anytime in the future with ease.
            </p>
            <button className="loginfromhome">
              <Link to="/login">Se Connecter</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCo;
