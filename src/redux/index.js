// TODO: 简单实现一个redux


/**
 * @description: 创建 Store 实例
 * @param reducer 初始化的 reducer
 * @param initialState 初始化的 state
 * @return { getState,dispatch,subscribe}
 */
const ActionTypes = {
    INIT: "@INIT REDUX"
}


export function createStore(reducer, enhancer) {
    let state = undefined;
    let listeners = [];

    if(enhancer){
        return enhancer(createStore)(reducer);
    }

    dispatch({type: ActionTypes.INIT})

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }
    
    // 传入一个函数，这个函数会在每次 state 更新的时候被调用
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            listeners = listeners.filter(func => func !== listener);
        }
    }
    
    return {
        getState,
        dispatch,
        subscribe
    };
    }


export function combineReducers(reducers) {
    let nextState = {}
    return function combination(state,action) {
        Object.entries(reducers).forEach( ([key, reducers]) => {
            nextState[key] = reducers(nextState[key], action);
        })
        return nextState;
    }
}

export function applyMiddleware(...middleWares) {
    return (createStore) => (reducer) => {
        const store = createStore(reducer);
        let dispatch = store.dispatch
        const middlewareAPI = {
            getState: store.getState,
            dispatch
        }
        const chain = middleWares.map(middleware => middleware(middlewareAPI));
        dispatch = compose(...chain)(dispatch);
        return {
            ...store,
            dispatch
        }
    }

}

function compose(...funcs) {
    if(funcs.length === 0 ){
        return args => args;
    }

    if(funcs.length === 1){
        return  funcs[0];
    }
    return funcs.reduce((a,b) => (...args) => a(b(...args)))
}