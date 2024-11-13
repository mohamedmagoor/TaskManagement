import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import { Box } from '@mui/material';

const TodoList = () => {
    const { todos } = useContext(TodoContext);

    return (
        <Box sx={{ mt: 3 }}>
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </Box>
    );
};

export default TodoList;
