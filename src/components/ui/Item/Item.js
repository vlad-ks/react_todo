import React, {memo} from "react";

import "./Item.css";

const Item = ({
  upActive = false,
  downActive = false,
  onRemove,
  onUp,
  onDown,
  onAddSub,
  children
}) => {
    function removeHandler() {
        onRemove();
    }

    function addSubHandler() {
        onAddSub();
    }

    function upHandler() {
        onUp();
    }

    function downHandler() {
        onDown();
    }

    return (
        <div className="item">
            {children}
            {upActive && <button className="btn" onClick={upHandler}>up</button>}
            {downActive && <button className="btn" onClick={downHandler}>down️</button>}
            <button className="btn" onClick={addSubHandler}>add</button>
            <button className="btn" onClick={removeHandler}>remove</button>
        </div>
    )
};

export const UIItem = memo(Item);
