import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a search term");
      return;
    }

    setLoading(true);
    try {
      const youtubeResults = await axios.get(
        `http://localhost:5000/youtube/search`,
        { params: { query } }
      );
      const articleResults = await axios.get(
        `http://localhost:5000/search/search`,
        { params: { query } }
      );
      const scholarResults = await axios.get(
        `http://localhost:5000/scholar/scholar`,
        {
          params: { query },
        }
      );

      const allResults = [
        { type: "youtube", data: youtubeResults.data },
        { type: "articles", data: articleResults.data },
        { type: "scholar", data: scholarResults.data },
      ];

      setResults(allResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredResults = results.filter(
    (result) => filter === "all" || result.type === filter
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Search the Internet
      </h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search term"
          className="p-2 border rounded-md w-80"
        />
        <button
          onClick={handleSearch}
          className="ml-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <label className="mr-4">Filter by:</label>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded-md"
        >
          <option value="all">All</option>
          <option value="youtube">YouTube Videos</option>
          <option value="articles">Articles/Blogs</option>
          <option value="scholar">Academic Papers</option>
        </select>
      </div>

      <div className="space-y-8">
        {filteredResults.length > 0 ? (
          filteredResults.map((result) => (
            <div key={result.type}>
              <h2 className="text-2xl font-semibold mb-4">
                {result.type === "youtube"
                  ? "YouTube Videos"
                  : result.type === "articles"
                  ? "Articles/Blogs"
                  : "Academic Papers"}
              </h2>
              <div className="space-y-4">
                {result.data.map((item, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      {item.snippet || item.description}
                    </p>
                    <a
                      href={
                        item.link ||
                        `https://www.youtube.com/watch?v=${item.videoId}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View {result.type === "youtube" ? "Video" : "Link"}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
