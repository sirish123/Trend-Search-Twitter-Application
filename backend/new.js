// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search
const PORT = 8000
const needle = require('needle');
const express  = require('express')
const app = express()
const cors = require('cors');
const nodemon = require('nodemon');
app.use(cors())

app.get('/result',async (req,res)=>{
    const tweet = req.query.tweet
    console.log(tweet)
    const response = await getRequest(tweet);
    res.json(response)
})

app.get('/resulttrends',async (req,res)=>{
    const tweet = req.query.tweet
    const response = await getRequesttrends(tweet);
    res.json(response)
})

// The code below sets the bearer TOKEN from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const config = require("dotenv").config();
const TOKEN = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";
const endpointUri = "https://api.twitter.com/1.1/trends/place.json";

async function getRequesttrends(tweet) {
    //console.log(tweet)
    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
     const params = {
        'id':tweet
    }

    const res = await needle('get', endpointUri, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${TOKEN}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

async function getRequest(tweet) {
   // console.log(tweet)
    // Edit query parameters below
    // specify a search query, and any additional fields that are required
    // by default, only the Tweet ID and text fields are returned
     const params = {
        'query': tweet,
        'tweet.fields':'author_id,id,created_at,geo,entities',
        'expansions':'attachments.media_keys',
        'media.fields':'preview_image_url,url'
          
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${TOKEN}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

// (async () => {

//     try {
//         // Make request
//         const response = await getRequest();
//         console.dir(response, {
//             depth: null
//         });

//     } catch (e) {
//         console.log(e);
//         process.exit(-1);
//     }
//     process.exit();
// })();

app.listen(PORT , () =>console.log(`server running on port ${PORT}`))