
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuid from 'react-uuid';
//import uuidv4 from 'uuid';

//taọ lưu trữ dữ liệu
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App(){
  const [todos, setTodos]= useState([])
  const todoNameRef = useRef()

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }
  function handleAddTodo(e){
    const name = todoNameRef.current.value;
    if(name === '') return
    //console.log(name);
    setTodos(prevTodo =>{
      return [...prevTodo, { id: uuid(), name: name, completed: false }]
    })
    //reset sau mỗi lần nhập
    todoNameRef.current.value = null;
  }
   function handleClearTodos(){
    const newTodos = todos.filter(todo =>!todo.completed)
    setTodos(newTodos);
  }
  return(
  <div>
  <TodoList todos={todos} toggleTodo={toggleTodo}/>
  <input ref={todoNameRef} type="text"></input>
  <button onClick={handleAddTodo}> Add Todo</button>
  <button onClick={handleClearTodos}>Clear Complete</button>
  <div>{todos.filter(todo => !todo.completed).length} left todo</div>
  </div>
  )
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
 export default App;
