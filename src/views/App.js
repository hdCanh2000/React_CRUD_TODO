import "../views/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./Nav/Nav";
import HomePage from "./home/HomePage";
// import Redux from "./reduxSaga/ReduxSaga";
import FunctionTodo from "./todoFunction/FunctionTodos";
import ReduxTodos from "./todoRedux/ReduxTodos";
import ReduxSaga from "./PostList/index";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Nav />
        </div>
        <div className="header">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/function" element={<FunctionTodo />} />
            <Route path="/reduxtodo" element={<ReduxTodos />} />
            <Route path="/redux" element={<ReduxSaga />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
