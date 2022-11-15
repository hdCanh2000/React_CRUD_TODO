import React from "react";
import { useState, useReducer } from "react";
import { Button } from "@mui/material";
import "../App.css";

function App() {
  // State: a counter value
  const [counter, setCounter] = useState(0);

  // Action: code that causes an update to the state when something happens
  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const discount = () => {
    setCounter((prevCounter) => prevCounter - 1);
  };

  // View: the UI definition
  return (
    <div className="App" style={{ color: "black" }}>
      <Button variant="contained" color="secondary" onClick={increment}>
        Increment
      </Button>
      <h2>Value: {counter}</h2>
      <Button variant="contained" color="secondary" onClick={discount}>
        Discount
      </Button>
    </div>
  );
}

export default App;
