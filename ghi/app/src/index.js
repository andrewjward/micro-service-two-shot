import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

async function loadShoes() {
  const shoe_response = await fetch("http://localhost:8080/api/shoes/");

  if (shoe_response.ok) {
    const shoe = await shoe_response.json();

    root.render(
      <React.StrictMode>
        <App shoes={shoe.shoes} />
      </React.StrictMode>
    );
  } else {
    console.error("shoe:", shoe_response);
  }
}

loadShoes();
