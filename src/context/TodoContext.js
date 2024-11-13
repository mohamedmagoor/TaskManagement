
import React, { createContext, useState, useEffect } from 'react';
import socket from '../socket';

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => {
        if (todos.length > 0) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]); 

    useEffect(() => {
        
        // socket.on('todoAdded', (todo) => {
        //     setTodos((prevTodos) => [...prevTodos, todo]);
        // });

        socket.on('todoUpdated', (updatedTodo) => {
            setTodos((prevTodos) =>
                prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
            );
        });

        socket.on('todoDeleted', (id) => {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        });


        return () => {
            socket.off('todoAdded');
            socket.off('todoUpdated');
            socket.off('todoDeleted');
        };
    }, []); 

    const addTodo = (todo) => {
        const newTodo = { ...todo, id: Date.now(), completed: false };
        setTodos([...todos, newTodo]);
        socket.emit('addTodo', newTodo);
    };

    const editTodo = (id, updatedTodo) => {
        const editedTodo = { ...updatedTodo, id };
        setTodos(todos.map((todo) => (todo.id === id ? editedTodo : todo)));
        socket.emit('editTodo', editedTodo);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        socket.emit('deleteTodo', id);
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, editTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;

