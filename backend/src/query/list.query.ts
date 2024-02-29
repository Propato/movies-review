export const QUERY = {
    SELECT_ALL: 'SELECT * FROM List WHERE userId = ? ORDER BY created_at DESC LIMIT 50',
    SELECT: 'SELECT * FROM List WHERE listId = ?',
    CREATE: 'INSERT INTO List (userId, listName) VALUES (?, ?)',
    UPDATE: 'UPDATE List SET listName = ? WHERE listId = ?',
    DELETE: 'DELETE FROM List WHERE listId = ?',

    SELECT_MOVIES: 'SELECT * FROM MovieFromList WHERE listId = ?',
    INSERT_MOVIE: 'INSERT INTO MovieFromList (movieId, listId) VALUES (?, ?)',
    DELETE_MOVIE: 'DELETE FROM MovieFromList WHERE movieId = ? AND listId = ?'
};