import express from 'express';
import database from './data-base/mysql.js';
import indexRouter from './index-router/router.js';
import morgan from 'morgan';
import path from 'path'

const app = express();

app.use(express.json());

const { con } = database;

const port=3030;


app.get("/", (req, res, next)=>{
  res.sendFile(path.join(__dirname, 'public/index.html'))
})
app.use(morgan('dev'));
app.use(indexRouter);
app.listen( port,()=> {
  console.log(`Server is listening on port${port}`)
})