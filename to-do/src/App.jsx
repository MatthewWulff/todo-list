import { useState } from "react";
import "./App.css";

function App() {
  const initialState = [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: true,
    },
  ];
  const [tasks, setTasks] = useState(initialState);
  const [todo, setTodo] = useState("");
  const [editingId, setEditingId] = useState(null); 
  const [editedTitle, setEditedTitle] = useState(""); 

  function handleSubmit(e) {
    e.preventDefault();
    const newToDo = {
      userId: 1,
      id: tasks.length + 1,
      title: todo,
      completed: false,
    };
    setTasks([newToDo, ...tasks]);
    setTodo("");
  }

  function handleProgress(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(newTasks);
  }

  function handleDelete(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function handleEdit(taskId) {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingId(taskId);
    setEditedTitle(taskToEdit.title);
  }

  function handleSave(taskId) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: editedTitle };
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditingId(null); // Exit edit mode
  }

  function handleCancel() {
    setEditingId(null); // Exit edit mode without saving
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Create Todo List </h1>
        <input
          placeholder="Add task"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button>Add</button>
      </form>
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type="checkbox"
            onChange={() => handleProgress(task.id)}
            checked={task.completed}
          />
          
          {/* Conditional rendering for edit mode */}
          {editingId === task.id ? (
            <>
              <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <button onClick={() => handleSave(task.id)}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <>
              {task.title}
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button
                disabled={!task.completed}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default App;