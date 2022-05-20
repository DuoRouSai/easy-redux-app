export function logMiddleWare(middlewareAPI) {
    return (next) => (action) => {
      console.log("logMiddleWare:", action);
      return next(action);
    };
  }
  
export function customMiddleWare(middlewareAPI) {
return (next) => (action) => {
    console.log("customMiddleWare");
    if (Object.prototype.toString.call(action) === "[object Promise]") {
    action.then((res) => {
        middlewareAPI.dispatch(res);
    });
    return;
    }
    return next(action);
};
}