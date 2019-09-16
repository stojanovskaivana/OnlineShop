
import database from '../data-base/mysql.js';

const { con } = database;

function listAllProduct(){
    const allProduct= 'SELECT * FROM product';
    return new Promise ((resolve,reject)=>{
        con.query(allProduct,(err,result)=>{
            if(err){
                reject(err);
                console.log(err);
            }else{
                resolve(result)
            }
        });
    });
}

const list=async(req,res,next)=>{
    try{
        const products=await listAllProduct();
        res.status(200).send({success: true, message: "A list of all items in the store", body: products});
    }catch(err){
        res.status(500).send({success: false, message: "Failed to fetch the list of items"});
    }await next;
};






function listOneProduct(id){
    const listOne='SELECT * FROM product WHERE id=?';
    return new Promise((resolve,reject)=>{
        con.query(listOne,[id],(err,result)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(result)

            }
        });
    });
    
} 

const listOne=async(req,res,next)=>{
    const id=req.params.id
    try{
        const product=await listOneProduct(id);
        res.status(200).send({success: true, message: `Showing one item with ID: ${id}`, body:product});
        
    }catch(err){
        res.status(500).send({success: false, message: "Failed to fetch the item"});
    }
    await next;
}



function createNewProduct(name,price){
    const createNewProduct = "INSERT INTO product (name, price) VALUES (?, ?)";
    return new Promise((resolve,reject)=>{
        con.query (createNewProduct,[name,price],(err,result)=>{
            if(err){
                reject(err);
                console.log(err)
            }else{
                resolve(result)
            }
        })
    })

}
const create=async(req,res,next)=>{
    const name=req.body.name;
    const price=req.body.price;
  
    try{
        const newProduct=await createNewProduct(name,price,);
        res.status(200).send({seccess: true, message: "New items has been added to the store", body: {name, price}});
    }
    catch(err){
        res.status(404).send({seccess: false, message: err.message});
    };
};



function deleteProduct (id){
    const deleteProducts='SELECT * FROM product WHERE id=?';
    return new Promise((resolve,reject)=>{
        con.query(deleteProducts,[id],(err,result)=>{
            if(err){
                reject(err);
                console.log(err);
            }else{
                resolve(result)
            }
        });
    });
}
const deleteOneProduct=async(req,res,next)=>{
    const id = req.params.id;

    try{
        const oneProduct=await deleteProduct(id);
        res.status(200).send({success:true,message: `Item with the ID: ${id} has been deleted from the store`});

    }catch(err){
        res.status(403).send({success: false, message: `Unable to delete item with ID: ${id}`});
  }
};
    

export default{
    list,
    listOne,
    create,
    deleteOneProduct
}











