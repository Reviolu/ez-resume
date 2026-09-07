import { useEffect, useState } from "react";

export default function App() {
  const [message, setMessage] = useState("loading…");

  useEffect(() => {
    fetch("http://localhost:3000/api/ping")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("could not reach the server"));
  }, []);

  return <h1>{message}</h1>;
}