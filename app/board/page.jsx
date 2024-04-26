"use client";
import React, { useState, lazy, Suspense, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Lists } from "./components.jsx";
import "@/app/registration/registration.css";
import "@/app/board/page.css";
import { v4 as uuidv4 } from "uuid";

export default function Board() {
  const [lists, Setlists] = useState([]);
  const [title, SetTitle] = useState("");

  const changeTitle = (e) => {
    SetTitle(e.target.value);
  };

  const addlist = () => {
    const id = uuidv4();
    const newList = {
      id: id,
    };
    Setlists((prevLists) => [...prevLists, newList]);
  };

  const handleDelete = (index) => {
    Setlists((prevLists) => {
      const updatedLists = [
        ...prevLists.slice(0, index),
        ...prevLists.slice(index + 1),
      ];
      return updatedLists;
    });
  };

  return (
    <div>
      <div className="topbar">
        <input
          name="Title"
          placeholder="Title..."
          onChange={changeTitle}
          value={title}
          id="titleinput"
          required
        />
        <div>
          <button className="button btn btn-primary" onClick={addlist}>
            Add List
          </button>
          <button className="btn btn-success">Save</button>
          <button className="btn btn-secondary">Leave</button>
        </div>
      </div>
      <div className="listBox">
        {lists.map((list, index) => (
          <Lists
            key={list.id}
            index={index}
            id={list.id}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
