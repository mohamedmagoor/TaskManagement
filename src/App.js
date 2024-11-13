// src/App.js
import React from 'react';
import TodoProvider from './context/TodoContext';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => (
    <TodoProvider>
        <TodoForm />
        <TodoList />
    </TodoProvider>
);

export default App;
