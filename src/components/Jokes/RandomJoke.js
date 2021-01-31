import React, { useState, useEffect } from "react";
import Joke from "./Joke";

const JOKE_URL = "https://official-joke-api.appspot.com/random_joke";

const RandomJoke = () => {
  const [joke, setJoke] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [hasError, setError] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch(JOKE_URL);
      const data = await res.json();
      setLoading(false);
      setJoke(data);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="joke">
      {isLoading && <p>Loading......</p>}
      {!hasError && <button onClick={fetchJoke}>Get a random joke</button>}
      {!hasError && <Joke setup={joke.setup} punchline={joke.punchline} />}
      {hasError && <p>I don't know what is going on</p>}
    </div>
  );
};

export default RandomJoke;
