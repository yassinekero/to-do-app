const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database('to_do.db');

// Middleware to parse JSON bodies
app.use(express.json());



// GET all to-do lists
app.get('/to-do-lists', (req, res) => {
    db.all('SELECT * FROM to_do_lists', (err, toDoLists) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const promises = toDoLists.map(toDoList => {
                return new Promise((resolve, reject) => {
                    db.all('SELECT * FROM tasks WHERE toDoListId = ?', [toDoList.id], (err, tasks) => {
                        if (err) {
                            reject(err);
                        } else {
                            toDoList.tasks = tasks;
                            resolve();
                        }
                    });
                });
            });

            Promise.all(promises)
                .then(() => {
                    res.json(toDoLists);
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).json({ error: 'Internal Server Error' });
                });
        }
    });
});
app.get('/to-do-lists/today', (req, res) => {
    const id = 3;
    db.get('SELECT * FROM to_do_lists WHERE id = ?', [id], (err, toDoList) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (!toDoList) {
            res.status(404).json({ error: 'To-do list not found' });
        } else {
            const today = new Date().toISOString().slice(0, 10);
            db.all('SELECT * FROM tasks WHERE startDate = ?', [today], (err, tasks) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    toDoList.tasks = tasks;
                    res.json(toDoList);
                }
            });
        }
    });
});
// GET a single to-do list by ID
app.get('/to-do-lists/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM to_do_lists WHERE id = ?', [id], (err, toDoList) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (!toDoList) {
            res.status(404).json({ error: 'To-do list not found' });
        } else {
            db.all('SELECT * FROM tasks WHERE toDoListId = ?', [id], (err, tasks) => {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    toDoList.tasks = tasks;
                    res.json(toDoList);
                }
            });
        }
    });
});

// POST a new to-do list
app.post('/to-do-lists', (req, res) => {
    const { title, days } = req.body;
    db.run('INSERT INTO to_do_lists (title, days) VALUES (?, ?)', [title, days], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// PUT (update) a to-do list by ID
app.put('/to-do-lists/:id', (req, res) => {
    const id = req.params.id;
    const { title, days } = req.body;
    db.run('UPDATE to_do_lists SET title = ?, days = ? WHERE id = ?', [title, days, id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'To-do list not found' });
        } else {
            res.json({ message: 'To-do list updated successfully' });
        }
    });
});

// DELETE a to-do list by ID
app.delete('/to-do-lists/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM to_do_lists WHERE id = ?', [id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'To-do list not found' });
        } else {
            res.json({ message: 'To-do list deleted successfully' });
        }
    });
});


//A method to verify that date format 
function isValidDateFormat(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}


app.get('/tasks/date/:date', (req, res) => {
    const requestedDate = req.params.date;

    if (!isValidDateFormat(requestedDate)) {
        res.status(400).json({ error: 'Invalid date format.' });
        return;
    }
    db.all('SELECT * FROM tasks WHERE startDate = ?', [requestedDate], (err, tasks) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(tasks);
        }
    });
});

// GET all tasks
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

// GET a single task by ID
app.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, task) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (!task) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json(task);
        }
    });
});

// GET tasks with startDate equal to today's date

// POST a new task
app.post('/tasks', (req, res) => {
    const { title, description, startDate, endDate, startTime, endTime, toDoListId, completed, tag, priority } = req.body;
    db.run('INSERT INTO tasks (title, description, startDate, endDate, startTime, endTime, toDoListId, completed, tag, priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [title, description, startDate, endDate, startTime, endTime, toDoListId, completed, tag, priority],
        function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                const taskId = this.lastID;
                const newTask = { id: taskId, title, description, startDate, endDate, startTime, endTime, toDoListId, completed, tag, priority };
                res.status(201).json(newTask); // Return the new task object
            }
        });
});

// PUT (update) a task by ID
app.put('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, startDate, endDate, startTime, endTime, toDoListId, completed, tag, priority } = req.body;
    const sql = `
        UPDATE tasks 
        SET title = ?, description = ?, startDate = ?, endDate = ?, startTime = ?, endTime = ?, toDoListId = ?, completed = ?, tag = ?, priority = ?
        WHERE id = ?`;
    const params = [title, description, startDate, endDate, startTime, endTime, toDoListId, completed, tag, priority, id];
    
    db.run(sql, params, function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json({ message: 'Task updated successfully' });
        }
    });
});




// DELETE a task by ID
app.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json({ message: 'Task deleted successfully' });
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
