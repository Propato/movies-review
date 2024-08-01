import { Router } from 'express';
import { getUsers, createUser, authUser, getUser, updateUser, updateUserPassword, deleteUser } from '../controller/user.controller';

const userRoutes = Router();

userRoutes.route('/')
    .get(getUsers)
    .post(createUser);

userRoutes.route('/auth')
    .get(authUser)

userRoutes.route('/:userId')
.get(getUser)
.put(updateUser)
.delete(deleteUser);

userRoutes.route('/:userId/password')
    .put(updateUserPassword)

export default userRoutes;