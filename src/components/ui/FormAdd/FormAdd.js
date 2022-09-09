import React, {memo} from "react";
import {getIdByDateNow} from "../../../helpers";

import "./FormAdd.css";

const FormAdd = ({ name, onSubmit }) => {
    function submitHandler(e) {
        e.preventDefault();

        const val = e.target[name].value.trim();
        if (!val) return;

        const id = getIdByDateNow("item");

        onSubmit(id, val);
        e.target[name].value = "";
    }

    return (
        <form className="form-add" onSubmit={submitHandler}>
            <input type="text" name={name} />
            <button>add</button>
        </form>
    );
};

export const UIFormAdd = memo(FormAdd);
