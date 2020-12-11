import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { getFirestore } from "redux-firestore";
//Local Files
import rootReducer from "./reducers";

//React chrome extension
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument({ getFirestore })))
);

export default store;
