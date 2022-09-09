import React from "react";
import {useSelector} from "react-redux";
import {getTodos} from "./store/todos";
import List from "./components/List";

const App = () => {
    const todos = useSelector(getTodos);

    return (
        <List todos={todos} activeSub />
    )
};

export default App;
