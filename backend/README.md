# Backend

The backend consists of a docker network with two containers, running the MySQL and TypeScript Server. MySQL has User, List and Reviews tables. TS define the EndPoints, so they can be easily found in the 'routes' directory.

The TMDB (The Movie Data Base) API is used to obtain movie data, but all other data is stored in this application's own system.

- <https://developer.themoviedb.org/reference/genre-movie-list>

This application is a basic version, as there are several possible improvements, such as the handling of errors and exceptions completely, but this basic form will serve this personal purpose.

## To Do

Whenever a user is created, they will have the lists: Favorites, Watch Later and Reviews.

## References

- <https://dev.mysql.com/doc/refman/8.0/en/preface.html>
- <https://restfulapi.net/http-status-codes/>
- <https://www.youtube.com/watch?v=aUMGAFE5pPM> (the most important for backend)
