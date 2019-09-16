import express from "express";
const indexRouter=express.Router(); 


import userIndex from '../users/index.js';
import creditCard from '../creditCard/index.js';
import productsIndex from '../product/index.js';
import orderIndex from '../orders/index.js';
import categoryIndex from '../category/index.js';


const { routes } = userIndex;
const { CreditCardRouter } = creditCard;
const {productsRouter}=productsIndex;
const {orderRouter}=orderIndex;
const {CategoryRouter}=categoryIndex;

indexRouter.use(routes);
indexRouter.use(CreditCardRouter);
indexRouter.use(productsRouter);
indexRouter.use(orderRouter);
indexRouter.use(CategoryRouter);


export default indexRouter;