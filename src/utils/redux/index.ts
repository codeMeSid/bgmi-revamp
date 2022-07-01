import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { systemReducer } from "./reducers/system";
import { userReducer } from "./reducers/user";

export const store = createStore(
  combineReducers({
    system: systemReducer,
    user: userReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
