import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";

// import ReduxSaga from "../views/reduxSaga/saga";
import postsSaga from "../views/PostList/saga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// sagaMiddleware.run(ReduxSaga);
sagaMiddleware.run(postsSaga);

export default store;
