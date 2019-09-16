import express from 'express';
const orderRouter = express.Router();


import actions from './actions.js';


const {list,orderOne,makeOrd,deleteOneOrder}=actions;

orderRouter.get('/orders/', list);
orderRouter.get('/orders/:id', orderOne);
orderRouter.post('/orders/', makeOrd);
orderRouter.delete('/orders/:id', deleteOneOrder);

export default orderRouter ;