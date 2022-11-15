import React from "react";
import { useReducer } from "react";
import { Grid, Button } from "@mui/material";
import "../App.css";

const reducer = (state, action) => {
  switch (action) {
    case "increment":
      return state + 1;
    case "discount":
      return state - 1;
    case "deleteAll":
      return 0;
    default:
      return state;
  }
};

function App() {
  const [counter, dispatch] = useReducer(reducer, 0);

  return (
    <div className="App">
      {/* <img src="https://picsum.photos/1000/600/?blur" className=" App-logo-spin" alt="logo" /> */}
      <img
        src="https://picsum.photos/1000/500"
        className=" App-logo-spin"
        alt="logo"
      />
      <h2 style={{ color: "black" }}>React useReducer</h2>
      <div className="App" style={{ color: "black" }}>
        <h2>Value: {counter}</h2>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch("increment")}
            >
              Increment
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch("discount")}
            >
              Discount
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => dispatch("deleteAll")}
            >
              Delete All
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
