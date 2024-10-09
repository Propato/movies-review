import { Router } from 'express';
import { createList, deleteList, getLists, updateList } from '../controllers/list.controller';

const listRoutes = Router();

listRoutes.route('/:userId')
    .post(createList)
    .get(getLists);

listRoutes.route('/:userId/:listId')
    .put(updateList)
    .delete(deleteList);

export default listRoutes;