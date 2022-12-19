import { combineReducers } from "redux";
import todoReducer from "./todo";
import currentUser from "./currentUser";
import reduxToDoReducer from "./reduxToDoReducer";
// import ReduxSagaTodos from "../../views/reduxSaga/reducer";
import postsReducer from "../../views/PostList/reducer";

const rootReducer = combineReducers({
  user: todoReducer,
  currentUser: currentUser,
  reduxToDo: reduxToDoReducer,
  // ReduxSagaTodos: ReduxSagaTodos,
  posts: postsReducer,
});
export default rootReducer;
