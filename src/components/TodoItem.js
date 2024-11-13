import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { Checkbox, IconButton, Typography, Box, Stack, Chip, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TodoItem = ({ todo }) => {
    const { editTodo, deleteTodo } = useContext(TodoContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(todo.task);
    const [editedPriority, setEditedPriority] = useState(todo.priority);
    const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);

    const toggleCompleted = () => {
        editTodo(todo.id, { ...todo, completed: !todo.completed });
    };

    const handleSave = () => {
        editTodo(todo.id, {
            ...todo,
            task: editedTask,
            priority: editedPriority,
            dueDate: editedDueDate,
        });
        setIsEditing(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                mb: 1,
                border: '1px solid #ddd',
                borderRadius: 2,
                backgroundColor: todo.completed ? '#f0f0f0' : 'white',
            }}
        >
            {isEditing ? (
                <Stack spacing={1} direction="row" alignItems="center">
                    <TextField
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                        size="small"
                        label="Task"
                    />
                    <TextField
                        value={editedPriority}
                        onChange={(e) => setEditedPriority(e.target.value)}
                        size="small"
                        label="Priority"
                    />
                    <TextField
                        type="date"
                        value={editedDueDate}
                        onChange={(e) => setEditedDueDate(e.target.value)}
                        size="small"
                    />
                    <Button onClick={handleSave} variant="contained" size="small" color="primary">
                        Save
                    </Button>
                    <Button onClick={() => setIsEditing(false)} size="small" color="secondary">
                        Cancel
                    </Button>
                </Stack>
            ) : (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Checkbox checked={todo.completed} onChange={toggleCompleted} />
                    <Typography variant="body1" sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.task}
                    </Typography>
                    <Chip label={todo.priority} color={todo.priority === 'High' ? 'error' : 'default'} />
                    <Typography variant="caption" sx={{ color: '#777' }}>{todo.dueDate}</Typography>
                </Stack>
            )}

            <Stack direction="row" spacing={1}>
                {!isEditing && (
                    <IconButton onClick={() => setIsEditing(true)} color="primary">
                        <EditIcon />
                    </IconButton>
                )}
                <IconButton onClick={() => deleteTodo(todo.id)} color="secondary">
                    <DeleteIcon />
                </IconButton>
            </Stack>
        </Box>
    );
};

export default TodoItem;
