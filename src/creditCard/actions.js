
import database from '../data-base/mysql';


const { con } = database;


function listAllCards(){
    const allCredicard='SELECT * FROM creditCard ';
    return new Promise((resolve,reject)=>{
        con.query(allCredicard,(err,result)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(result)
            }
        });
    });
}
const list = async(req,res,next)=>{
    try{
        const allCards=await listAllCards();
        res.status(200).send({succes:true, message: "A list of all payment cards stored in database", body: allCards});
    }
    catch(err){
        res.status(500).send(err.message);
    }
    await next;

};

 function listOneCard(userID){
     const OneCard='SELECT users.firstName, users.lastName, users.phoneNumber, users.email, users.username,  creditCard.cardNumber, creditCard.created_on FROM users INNER JOIN creditCard ON users.id = creditCard.userID WHERE users.id = ?';
     return new Promise((resolve,reject)=>{
         con.query(OneCard,[userID],(err,result)=>{
             if(err){
                 console.log(err);
                 reject(err);

             }else{
                 resolve(result)
             }
         })
     })
 }

 const listCard=async(req,res,next)=>{
    const userID = req.params.userID;

    try{
        const card=await listOneCard(userID);
        res.status(200).send({succes: true, message: `Credit card from the user with ID ${userID}`, body: card});
    } catch(err) {
        res.status(404).send({succes: false, message: `cannot find card for the provided user with ID ${userID}`});
    }
    await next;
};

    function deleteCard(id){
        const deleteCardOne='DELETE FROM creditCard WHERE id = ?';
        return new Promise((resolve,reject)=>{
            con.query(deleteCardOne,[id],(err,result)=>{
                if(err){
                    reject(err);
                    console.log(err);
                }else{
                    resolve(result)
                }
            })
        })
    }
    const deleteOneCard=async(req,res,next)=>{
         const id =req.params.id;

        try{
            const card=await deleteCard(id);
            res.status(200).send({success: true, message: `card for the provided user with ID ${id} has been deleted`})
        }catch(err){
            res.status(500).send(err.message);
        }
       await next;
    };


    export default {
    
        listCard,
        deleteOneCard,
        list
     
      };