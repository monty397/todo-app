import React from 'react'
import './App.css';

function App() {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    setTodos([...todos].concat(newTodo))
    setTodo("")
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)

    setTodos(updatedTodos)
  }

  function changeCheck(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
  }
  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
      }
      return todo;
    })

    setTodos(updatedTodos)
    setTodoEditing(null)
  }


  return (
    <div className="App">
      <div className="container2">
      <div className="container">
        <h1>Todo App</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} required />
          <button type="submit">Add</button>
        </form>

        
          {todos.map((todo) => <div className="todo" key={todo.id}>

            {todoEditing === todo.id
              ? (<input className="editbox" type="text" onChange={(e) => setEditingText(e.target.value)} value={editingText} />)
              : (<div>{todo.text}  <input className="check" type="checkbox" onChange={() => changeCheck(todo.id)} checked={todo.completed} /></div>)}

            <div><button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>

              {todoEditing === todo.id
                ? (<button className="submitEdit" onClick={() => submitEdits(todo.id)}>Submit Edits</button>)
                : (<button className="edit" onClick={() => setTodoEditing(todo.id)}>Edit</button>)}
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
