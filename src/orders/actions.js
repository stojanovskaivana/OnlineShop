
import database from '../data-base/mysql.js';
const { con } = database;


function  listAllOrders() {
    const listAllOrders= 'SELECT * FROM orders';
    return new Promise((resolve,reject)=>{
        con.query(listAllOrders,(err,result)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(result)
            }
        });
    });
}

const list=async(req,res,next)=>{
    try{
      const allorders=await listAllOrders();
      res.status(200).send({succes:true,message: "A list of all orders ", body: allorders})
    }catch(err){

        res.status(503).send({succes:false})

    }await next;
};


 function listOneOrder(id){
    const oneOrder = "SELECT users.firstName, users.lastName, users.username, users.email, creditCard.cardNumber,orders.dateOrdered FROM orders INNER JOIN users ON orders.usersID = users.id INNER JOIN creditCard ON orders.creditCardID = orders.id INNER JOIN product ON orders.productID = product.id WHERE users.id = ?";
    return new Promise((resolve,reject)=>{
         con.query(oneOrder,[id],(err,result)=>{
           if(err){
                reject(err);
                 console.log(err)
           }else{
                resolve(result)
            }
        });
    });


 }

const orderOne=async(req,res,next)=>{
    const id = req.params.id;
   try{
        const order = await listOneOrder(id)
         res.status(200).send({succes:true, message: `Orders for the users with user ID ${id}`, body: order});
     }catch(err){
         res.status(400).send ({succes: false,message: err.message})
    }await next;
 }
 function makeOrder(dateOrdered,usersID,creditCardID,productID){
     const makeOneOrder=' INSERT INTO orders (dateOrdered,usersID,creditCardID,productID) VALUES (?, ?, ?, ?) '
     return new Promise((resolve,reject)=>{
         con.query(makeOneOrder,[dateOrdered,usersID,creditCardID,productID], (err,result)=>{
             if(err){
                 console.log(err);
                 reject(err);
             }else{
                 resolve(result)
             }
         });
     });
 }
 const makeOrd=async(req,res,next)=>{
     const dateOrdered =new Date(Date.now());
     const usersID =req.body.usersID;
     const creditCardID = req.body.creditCardID;
     const productID = req.body.productID;
     

     try{
         const oneOrder = await makeOrder(dateOrdered,usersID,creditCardID,productID);
         res.status(201).send({success: true, message: "The order have been placed with the items in the cart", body: {usersID, creditCardID, productID}});
     }catch(err){
        res.status(401).send({success: false, message: err.message});
     }await next;
 };
    function deleteOrder(userID){
        const deleteOrders='SELECT * FROM orders WHERE id=?'
        return new Promise((resolve,reject)=>{
             con.query(deleteOrders,[userID],(err,result)=>{
                 if(err){
                     console.log(err);
                     reject(err);
                 }else{
                     resolve(result)
                 }
             });

        });
    }

    const deleteOneOrder = async(req,res,next)=>{
        const userID=req.params.id;

        try{
            const delOrder=await deleteOrder(userID);
            res.status(201).send({success: true, message: `The order with ID ${userID} have been deleted`});
        }catch(err){
            res.status(401).send({success: false, message: "Unable to delete the order"});
        }
        await next;

    }

export default{
    list,
    orderOne,
    makeOrd,
    deleteOneOrder
}
