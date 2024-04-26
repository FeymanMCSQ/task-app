"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/board/components.css";
import { v4 as uuidv4 } from "uuid";

function Model({
  isOpen,
  onClose,
  title,
  description,
  setTitle,
  setDescription,
  onSave,
  onDelete,
}) {
  if (isOpen === false) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <input
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="button-container">
          <button className="btn btn-success" onClick={onSave}>
            Save
          </button>
          <button className="btn btn-danger" onClick={onDelete}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Cards({ title, description, onClick, key }) {
  return (
    <div className="Card" onClick={onClick}>
      <p className="cardtext">{title}</p>
    </div>
  );
}

export function Lists({ index, handleDelete }) {
  const [tasks, Settasks] = useState([]);
  const [modalVisible, SetModalVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  const addTask = () => {
    const newTask = {
      title: "",
      description: "",
    };

    Settasks([...tasks, newTask]);
    setCurrentCard(newTask);
  };

  const handleCardClick = (index) => {
    setCurrentCard({ ...tasks[index], index });
    SetModalVisible(true);
  };

  const handleModalClose = () => {
    SetModalVisible(false);
    setCurrentCard(null);
  };

  const handleSave = () => {
    const { index, title, description } = currentCard;
    Settasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = { title, description };
      return updatedTasks;
    });
    handleModalClose();
  };
  const deleteTask = () => {
    const { index, title, description } = currentCard;
    Settasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      return [
        ...updatedTasks.slice(0, index),
        ...updatedTasks.slice(index + 1),
      ];
    });
    handleModalClose();
  };

  return (
    <div className="list">
      <input placeholder="Title..." />
      <div className="taskbox">
        {tasks.map((task, index) => (
          <Cards
            key={index}
            title={task.title}
            description={task.description}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
      <button className="btn btn-secondary greybutton" onClick={addTask}>
        Add Card
      </button>
      <button
        className="btn btn-danger redbutton"
        onClick={() => handleDelete(index)}
      >
        Delete List
      </button>
      <Model
        isOpen={modalVisible}
        onClose={handleModalClose}
        title={currentCard ? currentCard.title : ""}
        description={currentCard ? currentCard.description : ""}
        setTitle={(title) => setCurrentCard({ ...currentCard, title })}
        setDescription={(description) =>
          setCurrentCard({ ...currentCard, description })
        }
        onSave={handleSave}
        onDelete={deleteTask}
      />
    </div>
  );
}
