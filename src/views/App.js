import '../views/App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from './Nav/Nav'
import HomePage from './home/HomePage';
import Redux from './home/Redux'
import About from './home/About'
import TodoList from './todos/Todos';
import FunctionTodo from './todoFunction/FunctionTodos';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Nav />  
        </div> 
        <div className="header">
          <Routes>
            <Route exact path="/" element={<HomePage />}/>
            <Route path="/class" element={<TodoList />} />
            <Route path="/function" element={<FunctionTodo />} />
            <Route path="/about" element={<About />}/>
            <Route path="/redux" element={<Redux />}/>
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;







// { id: 4, code: 187754, fullName: 'Snow4', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
    // { id: 5, code: 187354, fullName: 'Snow5', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
    // { id: 6, code: 1845654, fullName: 'Snow6', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
    // { id: 7, code: 18475654, fullName: 'Snow7', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
    // { id: 8, code: 18545364, fullName: 'Snow8', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
    // { id: 9, code: 1845654, fullName: 'Snow9', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
    // { id: 10, code: 185454, fullName: 'Snow77', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
    // { id: 11, code: 183454, fullName: 'Snow88', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
    // { id: 12, code: 1854, fullName: 'Snow76', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
    // { id: 13, code: 184354, fullName: 'Snow', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
    // { id: 14, code: 187654, fullName: 'Snow78', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
    // { id: 15, code: 1857894, fullName: 'Snow765', age: 35, address: 'Ninh Bình', school:'ĐH Thái Nguyên', mail:'hdc@gmail.com', dob:'31/03/2000'},
