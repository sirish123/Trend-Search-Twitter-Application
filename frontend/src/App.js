import "./App.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { TwitterTweetEmbed } from "react-twitter-embed";
import NavbarComp from "./Components/NavbarComp";

function App() {
  const API_URL = "http://localhost:8000/result";
  const API_URi = "http://localhost:8000/resulttrends";
  const [tweets, settweet] = useState([]);
  const [trends, settrends] = useState([]);
  const [trendvalue, settrendvalue] = useState("23424848");
  const [userValue, setUserValue] = useState("dogs");
  const [change, setchange] = useState(false);
  const [chani, setchangei] = useState(false);
  useEffect(() => {
    axios
      .get(API_URL, {
        params: {
          tweet: userValue,
        },
      })
      .then((res) => {
        const responsetools = res.data;
        settweet(responsetools.data);
      });
  }, [change]);
  useEffect(() => {
    axios
      .get(API_URi, {
        params: {
          tweet: trendvalue,
        },
      })
      .then((res) => {
        const responsetools = res.data[0].trends;
        settrends(responsetools);
        console.log(trendvalue);
      });
  }, [chani]);

  console.log(tweets);

  const getInputValue = (event) => {
    setUserValue(event.target.value);
    console.log(userValue);
  };
  const getInputValue2 = (event) => {
    settrendvalue(event.target.value);
    console.log(trendvalue);
  };

  return (
    <div >
      <NavbarComp />
      <div className="container-fluid mt-5">
        
      <h2 className="text-center text-white">Twitter Trends</h2>
       
        <div className="row ms-3 me-3">
          <div className="col-lg-5 mb-3 border border-2 rounded shadow-sm searchBox">
            <form className="row g-3 m-2">
              <h1 className="text-white">Search Trend</h1>
              <div>
                <input
                  className="form-control"
                  type="text"
                  onChange={getInputValue2}
                />
              </div>
              <div className="mb-3 w-100 text-end">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
                  onClick={() => setchangei((chani) => !chani)}
                >
                  <i className="bi bi-search p-2"></i>WOEID
                </button>
              </div>
              <div className="trends">
                {trends &&
                  trends.map((obj) => (
                    <div className="block">
                      <h6>{obj.name}</h6>
                    </div>
                  ))}
              </div>
            </form>
          </div>

          <div className="col-lg-5 mb-3 ms-auto border border-2 rounded shadow-sm searchBox">
            <form className="row g-3 m-2">
              <h1  className="text-white">Search Tweet</h1>
              <div>
                <input
                  input type="text" 
                  onChange={getInputValue}
                  className="form-control"
                  
                />
              </div>
              <div className=" mb-3 w-100 text-end">
                <button
                  type="button"
                  class="btn btn-secondary btn-lg"
                  onClick={() => setchange((change) => !change)}
                >
                  
                  <i className="bi bi-search p-2"></i>Search Query
                </button>
              </div>
              
            </form>
            <div className="scroll">
                {tweets &&
                  tweets.map((tweet) => (
                    <div key={tweet.id}>
                      <TwitterTweetEmbed tweetId={tweet.id} />
                    </div>
                  ))}
              </div>
          </div>
        </div>
        </div>
 
      </div>
  );
}

export default App;
