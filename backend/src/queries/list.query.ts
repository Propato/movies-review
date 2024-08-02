export const QUERY = {
    SELECT_ALL: 'SELECT * FROM Lists WHERE userId = ? ORDER BY listName DESC LIMIT 50',
    SELECT_NAME: 'SELECT * FROM Lists WHERE userId = ? AND listName = ?',
    SELECT: 'SELECT * FROM Lists WHERE userId = ? AND listId = ?',
    CREATE: 'INSERT INTO Lists (userId, listName, description) VALUES (?, ?, ?)',
    UPDATE: 'UPDATE Lists SET listName = ?, description = ? WHERE userId = ? AND listId = ?',
    DELETE: 'DELETE FROM Lists WHERE userId = ? AND listId = ?',
};