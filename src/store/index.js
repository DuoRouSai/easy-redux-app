import { createStore, applyMiddleware } from "../redux";
import reducer from "./reducer";
import { customMiddleWare,logMiddleWare } from "./enhancer"


const store = createStore(reducer,applyMiddleware(customMiddleWare,logMiddleWare));

export default store;