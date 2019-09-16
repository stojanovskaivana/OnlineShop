import express from 'express';
const usersRouter = express.Router();

import actions from './actions.js';

//const {deleteUser} = actions;
const{create,deleteUser,listOne,list,logIn}=actions;


usersRouter.get('/users/', list);
 usersRouter.get('/users/:id', listOne);
 usersRouter.post('/users/', create);
usersRouter.delete('/users/:id', deleteUser);
// usersRouter.put('/users/:id', update);
 usersRouter.post('/login/', logIn);

export default usersRouter ;