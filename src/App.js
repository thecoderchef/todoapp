import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //State
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Run once when app starts
  useEffect(() => {
    getLocalTodos();
  }, []); 
   
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

 



  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);
   
  //Functions
  // const filterHandler = () => {
  //   switch(status){
  //     case 'completed':
  //       setFilteredTodos(todos.filter(todo => todo.completed === true));
  //       break;
  //       case 'uncompleted':
  //       setFilteredTodos(todos.filter(todo => todo.completed === false));
  //       break;
  //       default:
  //         setFilteredTodos(todos);
  //         break;
  //   }
  // }

  // save to local 
  const saveLocalTodos = () => {
    if(todos && todos.length > 0) {
    localStorage.setItem('todos', JSON.stringify(todos));
    }
       //   if (localStorage.getItem('todos') === null) {
      //     localStorage.setItem('todos', JSON.stringify([]));
      //    } else {
      //     localStorage.setItem('todos', JSON.stringify(todos));
      //      }
  };
  const getLocalTodos = () => { 
    // let todoLocal = JSON.parse(localStorage.getItem('todos'));
    // setTodos(todoLocal);   
    if(localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
     let todoLocal = JSON.parse(localStorage.getItem('todos'));
     setTodos(todoLocal);
    }
  };
  return (
    <div className="App">
     <header>
      <h1>Sunny's Todo List</h1>
     </header>
     <Form 
     todos={todos} 
     setTodos={setTodos} 
     inputText={inputText} 
     setInputText={setInputText} 
     setStatus={setStatus}
     />
     <TodoList 
     todos={todos}
     setTodos={setTodos} 
     filteredTodos={filteredTodos}
     />
    </div>
  );
}

export default App;
