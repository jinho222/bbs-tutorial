import { combineReducers, configureStore } from "@reduxjs/toolkit";
import memberSlice from "./member";
import logger from "redux-logger";

const reducer = combineReducers({
	member: memberSlice.reducer,
})

const store = configureStore({
	reducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
})

export default store;