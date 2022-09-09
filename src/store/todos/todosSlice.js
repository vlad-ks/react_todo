import { createSlice } from '@reduxjs/toolkit';
import {getDeepArrayParent} from "../../helpers";

import TODOS from "../data.json";


const initialState = TODOS;

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodoAction: (state, action ) => {
            const { id, text, path } = action.payload;
            const { index, parent } = getParentArrayData(state, path);

            if (parent) {
                if (!parent.ch) {
                    parent.ch = [];
                }

                parent.ch[index] = { id, text };
                return state;
            }

            state[index] = { id, text };
            return state
        },
        removeTodoAction: (state, action) => {
            const { path } = action.payload;
            const { index, parent } = getParentArrayData(state, path);

            if (parent) {
                if (parent.ch.length === 1) {
                    delete parent.ch;
                    return state;
                }

                parent.ch.splice(index, 1);
                return state;
            }

            state.splice(index, 1);
            return state;
        },
        moveUpTodoAction: (state, action) => {
            const { path } = action.payload;
            const { index, parent } = getParentArrayData(state, path);
            const prevIndex = index - 1;

            if (parent) {
                const children = parent.ch;

                [ children[prevIndex], children[index] ] = [ children[index], children[prevIndex] ];
                return state;
            }

            [ state[prevIndex], state[index] ] = [ state[index], state[prevIndex] ];
            return state;
        },
        moveDownTodoAction: (state, action) => {
            const { path } = action.payload;
            const { index, parent } = getParentArrayData(state, path);
            const prevIndex = index + 1;

            if (parent) {
                const children = parent.ch;

                [ children[index], children[prevIndex] ] = [ children[prevIndex], children[index] ];
                return state;
            }

            [ state[index], state[prevIndex] ] = [ state[prevIndex], state[index] ];
            return state;
        },
    },
});

export const {
    addTodoAction,
    removeTodoAction,
    moveUpTodoAction,
    moveDownTodoAction
} = todosSlice.actions;
export default todosSlice.reducer;


function getParentArrayData(state, path) {
    const pathArray = path.split(".");
    const index = +pathArray.at(-1);
    let parent;

    if (pathArray.length > 1) {
        parent = getDeepArrayParent(state, pathArray, "ch");
    }

    return { index, parent };
}