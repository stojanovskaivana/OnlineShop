import express from 'express';
const CategoryRouter = express.Router();

import actions from './actions.js';

const{listCategory,listOneProduct}=actions;



CategoryRouter.get('/category/', listCategory);
CategoryRouter.get('/category/:productID', listOneProduct);






export default CategoryRouter;