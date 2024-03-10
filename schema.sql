CREATE TABLE to_do_lists (
    id INTEGER PRIMARY KEY,
    title TEXT,
    days TEXT
);

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    title TEXT,
    description TEXT,
    startTime TEXT,
    endTime TEXT,
    
    toDoListId INTEGER,
    FOREIGN KEY(toDoListId) REFERENCES to_do_lists(id)
);
