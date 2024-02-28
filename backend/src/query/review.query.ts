export const QUERY = {
    SELECT_ALL: 'SELECT * FROM Reviews WHERE userId = ? ORDER BY rate DESC',
    SELECT: 'SELECT * FROM Reviews WHERE userId = ? AND movieId = ?',
    CREATE: 'INSERT INTO Reviews (userId, movieId, rate, review) VALUES (?, ?, ?, ?)',
    UPDATE: 'UPDATE Reviews SET userId = ?, movieId = ?, rate = ?, review = ? WHERE userId = ? AND movieId = ?',
    DELETE: 'DELETE FROM Reviews WHERE userId = ? AND movieId = ?'
};