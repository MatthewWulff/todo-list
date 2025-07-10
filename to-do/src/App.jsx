import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
  const [todo, setTodo] = useState();
  function handleSubmit(e) {
    const newToDo = {
      userId: 1,
      id: tasks.length + 1,
      title: todo,
      completed: false,
    };
    setTasks([newToDo, ...tasks]);
    e.preventDefault();
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
  function handleDelete(taskId){
     const newTasks = tasks.filter((task) => task.id !== taskId);
    
    setTasks(newTasks);
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
          {task.title}
          <button>Edit</button>
          <button disabled={!task.completed} onClick={()=> handleDelete(task.id)}>Delete</button>
        </div>
      ))}
      <hr />
      <div>
        <input type="checkbox" />
        Create Mockup
        <button>Edit</button>
        <button>Delete</button>
      </div>

      <div>
        <input type="checkbox" />
        Create Static Layout
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div>
        <input type="checkbox" />
        <input type="text" placeholder="Add Interactivity" />
        <button>Save</button>
      </div>
    </>
  );
}

export default App;
