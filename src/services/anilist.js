require('dotenv').config();
const ANILIST_URL = process.env.ANILIST_API_URL;

// Function to make a request to the Anilist GraphQL API
async function anilistRequest(query, variables = {}){
    // Make the HTTP request to the Anilist GraphQL API
    const res = await fetch(ANILIST_URL, {
        method:"POST",
        //json body with query and variables
        headers:{'Content-Type':'application/json', Accept: 'application/json'},
        //stringify the body
        body: JSON.stringify({query, variables}),
    });

//parse the json response
const data = await res.json();

// even if we get a 200 status, Anilist may return errors in the response body, so we need to check for that as well in data.errors
if (!res.ok || data.errors) {
    //throw an error with the message from Anilist or a generic message
    const msg = data.errors?.[0]?.message || `Anilist request failed with status ${res.status}`;
    throw new Error(msg);

}

//return the data from the response
return data.data; 

};

module.exports = {anilistRequest};

