import { combineReducers, configureStore } from "@reduxjs/toolkit";
import memberSlice from "./member";
import logger from "redux-logger";

const reducer = combineReducers({
	memberReducer: memberSlice.reducer,
})

const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
})

export default store;