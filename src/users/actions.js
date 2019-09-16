import database from'../data-base/mysql.js';
const { con } = database;

export function response(req,res){
    res.send('Hii')
};

function listAllUser(){
  const listingAllUsers = 'SELECT * FROM users';
  return new Promise((resolve,reject)=>{
    con.query(listingAllUsers,(err,result)=>{
      if(err){
        console.log(err)
        reject(err);
      }else{
        resolve(result)
      }
    })
  })
}
const list=async(req,res,next)=>{
  try{
    const user = await listAllUser();
    res.status(200).send({succes:true, message: "A list of all users", body:user});
  }catch (err){
    res.status(500).send(err.message);
  }
  await next;
  }
     
   function listSingleUser(id){
     const listSingleUser='SELECT * FROM users WHERE id=?';
     return new Promise((resolve,reject)=>{
       con.query(listSingleUser,[id],(err,result)=>{
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
    const id=req.params.id;
    try{
      const user = await listSingleUser(id)
      res.status(200).send({success: true, message: `user with username ${user[0].username} is displayed`, body: user[0]});
    }catch(err){
      res.status(500).send(err.message);
    }await next;
  }
    

    function createNewUser(firstName,lastName,adressa,email,phoneNumber,username,password,created_on){
      const createUser = 'INSERT INTO users (firstName, lastName, adressa, email, phoneNumber, username, password, created_on) VALUES (?,?,?,?,?,?,?,?)';
      return new Promise((resolve,reject)=>{
        con.query(createUser,[firstName,lastName,adressa,email,phoneNumber,username,password,created_on],(err,result)=>{
          if(err){
            console.log(err);
            reject(err)
          }else{
            resolve(result)
          }
        });
      });
    };

const create=async(req,res,next)=>{

  const firstName = req.body.firstName;
  const lastName=req.body.lastName;
  const adressa=req.body.adressa;
  const email=req.body.email;
  const phoneNumber=req.body.phoneNumber;
  const username=req.body.username;
  const password=req.body.password;
  const created_on= new Date(Date.now());

  const usersInDB=await listAllUser();

  // for(let i = 0; i < 10; i++) {
  //   if(username === usersInDB[i].username) {
  //       return res.status(400).send({success: false, message: "Check your username or e-mail"});
  //     } else {
  //       const newUser = await createNewUser(firstName, lastName, adressa, email, phoneNumber, username, password, created_on);
  //       return res.status(200).send({success: true, message: "New user has been created", body: newUser});
  //     }    
  //   };

  if(usersInDB < 0) {
    const newUser = await createNewUser(firstName, lastName, adressa, email, phoneNumber, username, password, created_on);
    return res.status(200).send({success: true, message: "New user has been created", body: newUser});
    } else {
      for (let i = 0; i < usersInDB.length; i++) {
        if (username === usersInDB[i].username || email === usersInDB[i].email) {
          return res.status(400).send({success: false, message: "Check your username or e-mail"});
      };
    };
  };
  await next
};

  function deleteSingleUser(id){
    const deleteOne='DELETE FROM users WHERE id=?';
    return new Promise((resolve,reject)=>{
      con.query(deleteOne,[id],(err,result)=>{
        if(err){
          console.log(err);
          reject(err);
        }else{
          resolve(result)
        }
      });
    });
  }
    const deleteUser=async(req,res,next)=>{
      const id=req.params.id
      try{
        const user=await listSingleUser(id);
        const deleteUser = await deleteSingleUser(id);
        res.status(200).send({succes:true, message:`The user with ${user[0].username} has been deleted from the database`})
      }catch(err){
        res.status(400).send(err.message)
      } 
      await next;
    };

    function updateUser(user,id){
      const updateUser='UPDATE user SET firstName = ?, lastName = ?, phoneNumber = ?, username = ?, email = ? WHERE id = ?'
      return new Promise((resolve,reject)=>{
        con.query(updateUser,[user.firstName, user.lastName, user.phoneNumber, user.username, user.email, id],(err,result)=>{
          if(err){
            reject(err);
            console.log(err)
          }else{
            resolve(result)
          }
        })
      
      })
    }
    const update=async(req,res,next)=>{
      const id=req.params.id;
      

      const firstName=req.body.firstName;
      const lastName=req.body.lastName;
      const phoneNumber=req.body.phoneNumber;
      const username=req.body.username;
      const email=req.body.email;

      let user = { 
        firstName: '',
        lastName: '',
        username: '',
        phoneNumber: '',
        email: '',
        password: ''
      };
    try{
      const users=await listSingleUser();
      const userFromDb=users[0];

      
      if(firstName == null || firstName == undefined) {
        user.firstName = userFromDb.firstName
      } else {
        user.firstName = firstName
      }
      if(lastName == null || lastName == undefined) {
        user.lastName = userFromDb.lastName
      } else {
        user.lastName = lastName
      }
      if(username) {
        return res.status(403).send({success: false, message: "You cannot change username"});
      } else {
        user.username = userFromDb.username;
      }
      if(phoneNumber == null || phoneNumber == undefined) {
        user.phoneNumber = userFromDb.phoneNumber
      } else {
        user.phoneNumber = phoneNumber
      }
      if(email == null || email == undefined) {
        user.email = userFromDb.email
      } else {
        user.email = email
      }
      if (password == null || password == undefined) {
        user.password = userFromDb.password;
      } else {
        user.password = password;
      }
      const resultFromUpdateDb = await updateUser(user, id);
      res.status(200).send({success: true, message: `User with provided username ${user.username} has been updated!`});
  } catch(err) {
      res.status(500).send({success: false, message: err.message});
  }
  await next;
    } 
    
    function userLogIn(email, password) {
      const findUserWithEmailPass = "SELECT * FROM users WHERE email = ? && password = ?";
      return new Promise((resolve, reject) => {
        con.query(findUserWithEmailPass, [email, password], (err, results) => {
          if (err) {
            reject(err);
            console.error(err);
          } else {
            resolve(results);
          }
        });
      });
    };
    
    const logIn = async (req, res, next) => {
      const email = req.body.email;
      const password = req.body.password;
      
      const loggedUser = await userLogIn(email, password);
    
     if (loggedUser.length > 0) {
      res.status(200).send('Logged in');
     } else {
      res.status(404).send(`User with the email ${email} not found`);
     }  
     await next;
    };
    
    export default {
      response,
      list,
      listOne,
      create,
      deleteUser,
      update,
      logIn
    };