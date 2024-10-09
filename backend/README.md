# Backend

## Refactoring

I refactored the backend.

I rebuilt the SQL tables and will now reconnect with the TMDB API.

## Data Diagram

<div align="center">
    <img width="50%" src="./db/model/data-diagram.png" alt="Data Diagram">
</div>

## Description

The backend consists of a docker network with two containers, one running the MySQL and the another the Node Server. MySQL has User, List and Reviews tables. Node with TS defines the EndPoints. They can be easily found in the 'routes' directory.

The TMDB (The Movie Data Base) API is used to obtain movie data, but all other data is stored in this application's own system.

- <https://developer.themoviedb.org/reference/genre-movie-list>

This application is a basic version, as there are several possible improvements, such as the handling of errors and exceptions completely, but this basic form will serve this personal purpose.

## To Do

### Documentation

Complete the system documentation, explaining how to run, use and end the backend application.
 
### Procedures

#### Users

Whenever a user is created, they will have the following lists:

 - Favorites,
 - Watch Later,
 - Reviews.

 #### Reviews

 Whenever a review is made, it is added to the Reviews list (even if it is already in another list).

### Exceptions

It is important to handle exceptions correctly, identifying the error and returning the necessary data.

## References

- <https://dev.mysql.com/doc/refman/8.0/en/preface.html>
- <https://restfulapi.net/http-status-codes/>
- <https://www.youtube.com/watch?v=aUMGAFE5pPM> (the most important for backend)
