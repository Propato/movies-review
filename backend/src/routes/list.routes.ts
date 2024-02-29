import { Router } from 'express';
import { createList, deleteList, deleteFromList, getMoviesFromList, getLists, updateList, insertInList } from '../controller/list.controller';

const listRoutes = Router();

listRoutes.route('/')
    .post(createList);

listRoutes.route('/all/:userId')
    .get(getLists);

listRoutes.route('/:listId')
    .get(getMoviesFromList)
    .put(updateList)
    .post(insertInList)
    .delete(deleteList);

listRoutes.route('/:listId/:movieId')
    .delete(deleteFromList);

export default listRoutes;