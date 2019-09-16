
import database from '../data-base/mysql';
const { con } = database;

function listAllCategory(){
    const allCategory='SELECT * FROM category';
    return new Promise((resolve,reject)=>{
        con.query(allCategory,(err,result)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(result)
            }
        });
    });
}
const listCategory = async(req,res,next)=>{
    try{
        const allCategory=await listAllCategory();
        res.status(200).send({succes:true, message: "listing all category of product", body: allCategory});
    }
    catch(err){
        res.status(500).send(err.message);
    }
    await next;

};

function listProduct(productID){
    const OneCategory='SELECT product.name, product.price, category.name FROM product INNER JOIN category ON product.id = category.productID WHERE product.id = ?';
    return new Promise((resolve,reject)=>{
        con.query(OneCategory,[productID],(err,result)=>{
            if(err){
                console.log(err);
                reject(err);

            }else{
                resolve(result)
            }
        })
    })
}

const listOneProduct=async(req,res,next)=>{
   const productID = req.params.productID;

   try{
       const product=await listProduct(productID);
       res.status(200).send({succes: true, message: `This is the product: ${productID}`, body: product});
   } catch(err) {
       res.status(404).send({succes: false, message: ` the product can't be found${productID}`});
   }
   await next;
};



export default {
    
    listCategory,
    listOneProduct
 
  };