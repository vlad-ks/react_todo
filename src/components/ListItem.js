import React, {memo, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {
    moveDownTodoAction,
    moveUpTodoAction,
    removeTodoAction
} from "../store/todos";
import { UIItem } from "./ui/Item";
import List from "./List";


const ListItem = ({ text, todos, path, index, lastIndexSiblings }) => {
    const dispatch = useDispatch();
    const [activeSub, setActiveSub] = useState(false);

    const showAddSub = useCallback(() => {
        setActiveSub(!activeSub);
    }, [setActiveSub, activeSub]);

    const removeTodo = useCallback(() => {
        dispatch(removeTodoAction({ path }));
    }, [dispatch, path]);

    const upTodo = useCallback(() => {
        dispatch(moveUpTodoAction({ path }));
    }, [dispatch, path]);

    const downTodo = useCallback(() => {
        dispatch(moveDownTodoAction({ path }));
    }, [dispatch, path]);

    return (
        <li>
            <UIItem
                onRemove={removeTodo}
                onAddSub={showAddSub}
                downActive={!!lastIndexSiblings && index < lastIndexSiblings}
                upActive={!!lastIndexSiblings && index > 0}
                onUp={upTodo}
                onDown={downTodo}
            >
                {text}
            </UIItem>
            <List todos={todos} path={path} activeSub={activeSub}/>
        </li>
    );
};

export default memo(ListItem);