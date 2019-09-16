import mysql from 'mysql';
import configs from '../../confiquration/mysql.json';
const con = mysql.createConnection(configs);

import table from "../models/createTable";
const { usersTable,creditCard,product, category,orders } = table;

    
con.connect((err) => {
    if(err) {
        console.error(err);
    } else {
    console.log("db connection is on");
    con.query(usersTable);
    con.query(creditCard);
    con.query(product);
    con.query(category);
    con.query(orders);
    }
});

export default {
    con
};