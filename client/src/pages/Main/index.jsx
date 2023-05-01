import React, {useState} from "react";
import Navbar from '../welcome/Navbar'
import { Button, Popover } from "antd";
import axios from "axios"; // for making HTTP requests
import cheerio from "cheerio"; // for web scraping
import {Stitch, AnonymousCredential} from "mongodb-stitch-browser-sdk"; // for connecting to MongoDB
import "./index.css"
import { Card } from "antd";
import { Table } from "semantic-ui-react";
import { Container, Header, List } from "semantic-ui-react";
function Main() {
  // State variables for storing the input URL and extracted labels
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("Here is the article title");
  const [body, setBody] = useState("Here is the article content");
  const [author, setAuthor] = useState("Here is the article author name");
  const [source, setSource] = useState("Here is the article source");
  const [topic, setTopic] = useState("Here is the article topic");
  const [date, setDate] = useState("Here is the article date");

  
  // Function to handle form submit and trigger web scraping
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page from reloading

    // Make HTTP request to fetch webpage content
    const response = await axios.get(url);

    // Use Cheerio to parse HTML and extract labels
    //const $ = cheerio.load(response.data);
    //setTitle($("title").text());
    //setBody($("body").text());
    //setAuthor($('meta[name="author"]').attr("content"));
    //setSource($('meta[property="og:site_name"]').attr("content"));
    //setTopic($('meta[property="article:tag"]').attr("content"));

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
   const [open, setOpen] = useState(false);
   const hide = () => {
     setOpen(false);
   };
   const handleOpenChange = (newOpen) => {
     setOpen(newOpen);
   };

  return (
    <>
      <div className="App">
        <aside className="sidemenu">
          <div className="side-menu-button">
            <span>+</span>
            Clear Research
          </div>
        </aside>
        <section className="chatbox">
          <div className="result">
            <h1>Web Scraping</h1>
            <form onSubmit={handleSubmit}>
              <Popover
                placement="topRight"
                content={<a onClick={hide}>Close</a>}
                title="Enter the finance article url here "
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder=""
                />
              </Popover>

              <button type="submit">Scrape</button>
            </form>

            <div>
              {/* Use MongoDB Stitch to fetch and display last researches */}
            </div>
          </div>
          <div className="chat-log">
            <div className="chat-message"></div>
            <div className="avatar"></div>
            <div className="message">Result</div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Main;
