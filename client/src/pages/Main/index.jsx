import React, { useState, useCallback, useMemo, useRef } from "react";
import MainNavbar from "./MainNavbar";
import { Button, Popover, Result } from "antd";
import axios from "axios"; // for making HTTP requests
import cheerio from "cheerio"; // for web scraping
import { Stitch, AnonymousCredential } from "mongodb-stitch-browser-sdk"; // for connecting to MongoDB
import "./index.css";
import { Space, Table, Tag } from "antd";
import { BsRobot } from "react-icons/bs";
import { Container, Header, List } from "semantic-ui-react";
function Main() {
  // State variables for storing the input link and extracted labels
  const [link, setLink] = useState("");
  const [nodes, setNodes] = useState([]);
  const [xpaths, setXpaths] = useState([]);
  const [labels, setLabels] = useState([]);
  const [result, setResult] = useState([]);
const columns = [
  {
    title: "Node",
    dataIndex: "node",
    key: "node",
    width: 500,
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Xpath",
    dataIndex: "xpath",
    key: "xpath",
  },
  {
    title: "Predictions",
    key: "label",
    dataIndex: "label",
    render: (label) => {
      let color, fontSize;
      switch (label) {
        case "title":
          color = "blue";
          fontSize = "16px";
          break;
        case "body":
          color = "green";
          fontSize = "16px";
          break;
        case "date":
          color = "red";
          fontSize = "16px";
          break;
        case "source":
          color = "green";
          fontSize = "16px";
          break;
        case "topic":
          color = "green";
          fontSize = "16px";
          break;
        case "author":
          color = "green";
          fontSize = "16px";
          break;
        default:
          color = "geekblue";
          fontSize = "16px";
      }
      return (
        <Tag color={color} style={{ fontSize }}>
          {label}
        </Tag>
      );
    },
  },
];

  const SendLink = async () => {
    try {
      const resp = await axios.post("http://localhost:8000/predict", {
        link: link,
      });
      if (resp.data.error) {
        alert("error");
      } else {
        console.log(resp.data.result);
        console.log(result,"rani resulttttttttttttt")
        setNodes(resp.data.result.Node);
        console.log("nodeeees", nodes);
        setXpaths(resp.data.result.Xpath);
        setLabels(resp.data.result.Predicted);
        let outputList = [];

        for (let i = 0; i < nodes.length; i++) {
          let outputDict = {
            node: nodes[i],
            xpath: xpaths[i],
            label: labels[i],
          };
          if(outputDict.label!="other"){
            outputList.push(outputDict);
          }

          
          
          
          setResult(outputList);
          
        }

        console.log(result,"ena result lekhraaaaaaaaaaa");
      }
    } catch (error) {
      console.log(error);
    }
  };
  


  // Function to handle form submit and trigger web scraping
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page from reloading

    // Make HTTP request to fetch webpage content
    const response = await axios.get(link);
  };
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const CleanChat = ()=>{
    setXpaths([]);
    setNodes([]);
  setLabels([]);  }
  // Map over the data to generate table rows

  return (
    <>
     <MainNavbar/>
      <div className="App">
       
        <aside className="sidemenu">
          <div className="side-menu-button" onClick={CleanChat}>
            <span>+</span>
            Clear Research
          </div>
          <ul>
            <li>{link}</li>
          </ul>
          
        </aside>
        <section className="chatbox">
          <div className="result">
            <h1>Web Scraping Automation</h1>
            <BsRobot className="robot-icon"></BsRobot>

            <form onSubmit={handleSubmit}>
              <Popover
                placement="topRight"
                content={<a onClick={hide}>Close</a>}
                title="Enter the finance article link here "
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder=""
                />
              </Popover>

              <button type="submit" onClick={SendLink}>
                Scrape
              </button>
            </form>

            <div>
              {/* Use MongoDB Stitch to fetch and display last researches */}
            </div>
          </div>
          <div className="chat-log">
            <div className="message">
              <Table columns={columns} dataSource={result} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Main;
