import express from 'express';
const CreditCardRouter = express.Router();

import actions from './actions.js';

const{list,listCard,deleteOneCard}=actions;


CreditCardRouter.get('/creditCard/', list);
CreditCardRouter.get('/creditCard/:userID/', listCard);
CreditCardRouter.delete('/creditCard/:id/', deleteOneCard);




export default CreditCardRouter;