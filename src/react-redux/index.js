// TODO: 实现一个简单的 react-redux
import React, { createContext } from "react";

// 创建一个 context
const ReactReduxContext = createContext();

export function Provider ({
    store,
    children
}) {
    return (
        <ReactReduxContext.Provider value={store}>
            {children}
        </ReactReduxContext.Provider>
    )
}

export const connect = (mapStateToProps, mapDispatchToProps) => (Component) => {
    return class extends React.Component {
        static contextType = ReactReduxContext;
        constructor(props) {
            super(props);
            this.state = {}
        }
        componentDidMount() {
            const { subscribe, getState,dispatch } = this.context;
            this.setState({
                ...mapStateToProps(getState()),
                ...mapDispatchToProps(dispatch)
            })
            this.unsubscribe = subscribe(() => {
                this.setState({
                    ...mapStateToProps(getState()),
                    ...mapDispatchToProps(dispatch)
                })
            })
        }
        componentWillUnmount() {
            this.unsubscribe();
        }
        render() {
            return (
                <Component
                    {...this.props}
                    {...this.state}
                />
            )
        }
    }
}
