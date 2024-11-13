import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { TextField, Button, Select, MenuItem, Box, Stack } from '@mui/material';

const TodoForm = () => {
    const { addTodo } = useContext(TodoContext);
    const [task, setTask] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({
            task,
            priority,
            dueDate,
            completed: false,
        });
        setTask('');
        setPriority('Medium');
        setDueDate('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Stack spacing={2}>
                <TextField
                    label="Task"
                    variant="outlined"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                />
                <Select
                    label="Priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                </Select>
                <TextField
                    label="Due Date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Task
                </Button>
            </Stack>
        </Box>
    );
};

export default TodoForm;
