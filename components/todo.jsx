import { useState, useEffect } from 'react';

function getLocalTodos() {
   const localTodos = window.localStorage.getItem('todos');
   return localTodos ? JSON.parse(localTodos) : [];
}

function setLocalTodos(list) {
   window.localStorage.setItem('todos', JSON.stringify(list));
}

export default function ToDo() {

   const [todoList, setList] = useState([]);
   const [newTodo, setTodo] = useState('');

   function addTodo(event) {
      event.preventDefault();
      setList(todoList => {
         const newList = [...todoList, newTodo];

         setLocalTodos(newList);
         return newList;
      });
      setTodo('');
   }

   function removeTodo(event, key) {
      event.preventDefault();
      setList(todoList => {
         const testing = [...todoList];
         testing.splice(key, 1);

         setLocalTodos(testing);

         return testing;
      });
   }

   // Populate list after hydration
   useEffect(() => {
      setList(todoList => getLocalTodos());
   });

   return (
      <>
         <form>
            <ul>
               {todoList.map((todoItem, key) => 
                  <li key={key}>
                     <input type="checkbox" id={`todo${key}`} />
                     <label htmlFor={`todo${key}`}>{todoItem}</label>
                     <button className="delete-todo" onClick={(e) => removeTodo(e, key)}>X</button>
                  </li>
               )}
            </ul>
         </form>

         <form id="addTodo" onSubmit={addTodo}>
            <input id="textTodo" type="text" value={newTodo} onChange={(e) => setTodo(e.target.value)} />
            <button type="submit">Add Todo</button> 
         </form>
      </>
   );
}