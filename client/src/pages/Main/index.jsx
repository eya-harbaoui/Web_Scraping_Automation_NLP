import React, {useState} from "react";
import axios from "axios"; // for making HTTP requests
import cheerio from "cheerio"; // for web scraping
import {Stitch, AnonymousCredential} from "mongodb-stitch-browser-sdk"; // for connecting to MongoDB
import "./index.css"
function Main() {
  // State variables for storing the input URL and extracted labels
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const [topic, setTopic] = useState("");

  // Function to handle form submit and trigger web scraping
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page from reloading

    // Make HTTP request to fetch webpage content
    const response = await axios.get(url);

    // Use Cheerio to parse HTML and extract labels
    const $ = cheerio.load(response.data);
    setTitle($("title").text());
    setBody($("body").text());
    setAuthor($('meta[name="author"]').attr("content"));
    setSource($('meta[property="og:site_name"]').attr("content"));
    setTopic($('meta[property="article:tag"]').attr("content"));

    // Save extracted labels to MongoDB
    const client = Stitch.initializeDefaultAppClient("<YOUR-APP-ID>");
    await client.auth.loginWithCredential(new AnonymousCredential());
    const database = client
      .getServiceClient(Stitch.RemoteMongoClient.factory, "<YOUR-DB-NAME>")
      .db("<YOUR-COLLECTION-NAME>");
    const result = await database.insertOne({
      url,
      title,
      body,
      author,
      source,
      topic,
      timestamp: new Date(),
    });
    console.log(result.insertedId);
  };

  return (
      <div className="App">
          <h1>Web Scraping</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter article URL: 
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button type="submit">Scrape</button>
      </form>
      <div className="article-container">
        <h2>Title: {title}</h2>
        <p>Body: {body}</p>
        <p>Author: {author}</p>
        <p>Source: {source}</p>
        <p>Topic: {topic}</p>
      </div>
      <div>{/* Use MongoDB Stitch to fetch and display last researches */}</div>
    </div>
  );
}

export default Main;
