import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {addTodoAction} from "../store/todos";
import { UIFormAdd } from "./ui/FormAdd";
import ListItem from "./ListItem";


const List = ({ todos, path = "", activeSub }) => {
    const dispatch = useDispatch();
    const todosCount = todos?.length;
    const parentPath = path && path + ".";

    const addTodo = useCallback((id, text) => {
        dispatch(addTodoAction({
            id,
            text,
            path: parentPath + (todosCount ?? "0"),
        }));
    }, [dispatch, parentPath, todosCount]);

    return (
        <ul>
            {todos && todos.map(({ id, text, ch }, index) => (
                <ListItem
                    text={text}
                    path={parentPath + index}
                    todos={ch}
                    index={index}
                    lastIndexSiblings={todos.length - 1}
                    key={id}
                />
            ))}

            {activeSub && (
                <li>
                    <UIFormAdd name="last" onSubmit={addTodo} />
                </li>
            )}
        </ul>
    )
};

export default List;