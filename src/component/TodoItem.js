import React, { useEffect, useState } from "react";
import TodoCalender from "./TodoCalender";
import headerImage from "../component/header_img.png";
import { Zoom, Fade } from "react-awesome-reveal";

const getLocalStorageItems = () => {
  const myLists = localStorage.getItem("lists");
  if (myLists === true) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
const TodoItem = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(getLocalStorageItems);
  const [toggleSubmit, setToggleSubmit] = useState(false);
  const [isEdit, setIsEdit] = useState(null);

  let createRef = React.createRef();

  const handleClick = () => {
    if (!input) {
      createRef.current.innerHTML = "Plese enter input field!";
    } else if (input && !toggleSubmit) {
      createRef.current.innerHTML = "";
      setItems(
        items.map((element) => {
          if (element.id === isEdit) {
            return {
              ...element,
              text: input,
            };
          }
          return element;
        })
      );
      setToggleSubmit(true);
      setInput("");
      setIsEdit(null);
    } else {
      createRef.current.innerHTML = "";
      const allInput = {
        id: Math.floor(Math.random() * 10000),
        text: input,
      };
      setItems([...items, allInput]);
      setInput("");
    }
  };

  const editItem = (id) => {
    const updateItem = items.find((element) => {
      return element.id === id;
    });
    setToggleSubmit(false);
    setInput(updateItem.text);
    setIsEdit(id);
  };

  const deleteItem = (id) => {
    const filterItems = items.filter((element) => {
      return element.id !== id;
    });
    setItems(filterItems);
  };

  const removeItems = () => {
    setItems([]);
  };
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [input]);
  return (
    <div className="container">
      <div className="todoImage">
        <Zoom direction="right" delay="100" triggerOnce>
          <TodoCalender />{" "}
        </Zoom>
        <img
          src={headerImage}
          alt="header"
          width="100%"
          height="150px"
        />
      </div>

      <Fade delay="200">
        <div className="todo_main">
          <span className="msg" ref={createRef}></span>
          <input
            type="text"
            name="input"
            placeholder="Add Items"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="todo-input"
          />
          {toggleSubmit ? (
            <i
              class="fas fa-plus-circle todo-icons todo-icons-add"
              onClick={handleClick}
              title="Add Item"
            ></i>
          ) : (
            <i
              class="fas fa-edit todo-icons todo-icons-edit"
              onClick={handleClick}
              title="Edit Item"
            ></i>
          )}

          <div className="showItem">
            {items.map((item) => {
              return (
                <div className="todo-row">
                  <h3>{item.text}</h3>
                  <div className="icon_right">
                    <i
                      class="far fa-edit icons"
                      title="Edit Item"
                      onClick={() => editItem(item.id)}
                    ></i>
                    <i
                      class="far fa-trash-alt icons"
                      title="Delete Item"
                      onClick={() => deleteItem(item.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItem">
            <button className="todo-button" onClick={removeItems}>
              clear all
            </button>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default TodoItem;
