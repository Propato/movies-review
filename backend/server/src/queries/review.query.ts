export const QUERY = {
    SELECT_ALL: 'SELECT * FROM Reviews WHERE listId = ? ORDER BY rate DESC',
    SELECT: 'SELECT * FROM Reviews WHERE listId = ? AND movieId = ?',
    CREATE: 'INSERT INTO Reviews (listId, movieId, rate, review) VALUES (?, ?, ?, ?)',
    UPDATE: 'UPDATE Reviews SET rate = ?, review = ? WHERE listId = ? AND movieId = ?',
    DELETE: 'DELETE FROM Reviews WHERE listId = ? AND movieId = ?'
};