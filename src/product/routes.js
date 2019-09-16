import express from 'express';
const productRouter = express.Router();

import actions from './actions.js';


const{list,listOne,create,deleteOneProduct}=actions;
//const{listOne}=actions;
//const{create}=actions;
//const{deleteOneProduct}=actions;


productRouter.get('/items/', list);
productRouter.get('/items/:id', listOne);
productRouter.post('/items/', create);
productRouter.delete('/items/:id', deleteOneProduct);


export default productRouter;