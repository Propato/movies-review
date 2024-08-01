export const QUERY = {
    SELECT_ALL: 'SELECT * FROM Users ORDER BY created_at DESC LIMIT 50',
    SELECT: 'SELECT * FROM Users WHERE id = ?',
    SELECT_EMAIL: 'SELECT * FROM Users WHERE email = ?',
    CREATE: 'INSERT INTO Users (name, birthday, email, passhash) VALUES (?, ?, ?, ?)',
    UPDATE: 'UPDATE Users SET name = ?, birthday = ?, email = ? WHERE id = ?',
    UPDATE_PASSWORD: 'UPDATE Users SET passhash = ? WHERE id = ?',
    DELETE: 'DELETE FROM Users WHERE id = ?'
};