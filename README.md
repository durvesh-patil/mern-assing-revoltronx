This is my MERN assignment project,it is divided in client and server

## Approach

#### Backend

    Implementated 3 routes one for google scholars , one for google blogs/articles,one for youtube videos.
    Eg: http://localhost:5000/scholar/scholar?query=cats
        http://localhost:5000/search/search?query=cats
        http://localhost:5000/youtube/search?query=cats

    Get the api keys from google cloud console
    For scholars api key get it from serpapi.com

    1.Youtube results:
        - Fire the query to api which will get 10 results(can be changes)
        - Ordering will be based on viewCount which is a parameter in the axios.get() function
    2. Google Search:
        - After making custom search engine and getting the id fire the axios.get() to the api with max results as 10
    3. GoogleScholar:
        - Same with except the api which i sent request to is from serpapi.com with engine set as google scholar

    All of this returns search results for given api keys

#### Frontend

    Simple UI is implemnted which will search the all three api endpoints(youtube,googleScholar,web) based on the input given by user.
    For filtering  i have used which results the user want to see youtube, googlescholar , web or all the results.

## Challenges

    Configuring the api keys like how to set them up was the biggest challenge, but once figure out it was easy.

## Tech stack

    Client: React,TailwindCss,axios
    Server: Express,axios

### Installation

```bash
cd server
npm install
cd ..
cd client
npm intstall
```

### Start project

```bash
cd server
npm run dev
cd ..
cd client
npm run start
```
