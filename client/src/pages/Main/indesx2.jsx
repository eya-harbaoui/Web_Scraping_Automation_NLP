import React, {useState} from "react";
import axios from "axios";
import classNames from "classnames";
import "./index.css";
import Navbar from "./Navbar2";
function Main2() {
  const [url, setUrl] = useState("");
  const [articleData, setArticleData] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleScrapeClick = async () => {
    try {
      const response = await axios.post("/scrape", {url});
      setArticleData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Navbar/>
      <h1>Web Scraper</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter article URL"
          value={url}
          onChange={handleUrlChange}
        />
        <button onClick={handleScrapeClick}>Scrape</button>
      </div>
        <div className="article-container">
         {/* <h2>{articleData.title}</h2>*/}
          <p className="author">Author: {articleData.author}</p>
          <p className="source">Source: {articleData.source}</p>
          <p className="date">Date: {articleData.date}</p>
          <p className="body">{articleData.body}</p>
          <p className="topic">Topic: {articleData.topic}</p>
        </div>
    </div>
  );
}

export default Main2;
