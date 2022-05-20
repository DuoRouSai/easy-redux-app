import React, { } from "react";
import store from "./store";
import { connect } from "./react-redux";

function App({
    count,
    userInfo,
    addCount,
    minusCount,
    asyncAddCount,
    setUserInfo,
}) {
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={addCount}>+1</button>
            <button onClick={minusCount}>-1</button>
            <button onClick={asyncAddCount}>async +1</button>
            <h1>UserInfo: {JSON.stringify(userInfo)}</h1>
            <button onClick={setUserInfo}>张三出来！</button>
        </div>
    );
}

const mapStateToProps = (state) => ({
    count: state.count,
    userInfo: state.userInfo
})

const mapDispatchToProps = (dispatch) => ({
    addCount: () => dispatch({ type: "INCREMENT" }),
    minusCount: () => dispatch({ type: "DECREMENT" }),
    asyncAddCount: () => setTimeout(() => {
        store.dispatch({
            type: "INCREMENT"
        })
    }, 500),
    setUserInfo: () => dispatch({
        type: "SET_USER_INFO",
        userInfo: {
            name: "张三",
            age: 18
        }
    })
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

// export default App