import { combineReducers } from "redux";

import chat from "./chat";
import auth from "./auth";

const reducers = combineReducers({
	chat,
	auth
});

export default reducers;
