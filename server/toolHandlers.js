"use strict";

const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config({ path: __dirname + "/.env" });
// const { MONGO_URI } = process.env;
const { MONGO_URI_TORONTO } = process.env;


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// const client = new MongoClient(MONGO_URI, options);
const client = new MongoClient(MONGO_URI_TORONTO, options);


const callDb = async () => {
    // connect...
    await client.connect();

    // declare 'db'
    const db = client.db("RentR");

    // declare 'collection'
    // insertMany takes an array of objects
    // each object is a document in the collection !
    return db 
}


const getTools = async (req, res) => {
    try {
  
      const db = await callDb()
  
      const result = await db.collection("Tools3").find().toArray();
      // console.log("  ~ result", result)
  
      if (result.length === 0) {
        res.status(404).json({status : 404, message:`there are no Tools collection at the moment !`})
        return
      }
      res.status(200).json({message:"here are all the tools !", result })
  
    } catch (err) {
      console.log(err.stack);
    } 
      client.close();
}

const getToolById = async (req, res) => {
  const {id} = req.params
  // console.log("  ~ id", id)


  try {

    const db = await callDb()
    
    const result = await db.collection("Tools3").findOne({_id : id})
 
    if (result === null){
      res.status(400).json({status : 400, message:`no tool with that id exists !`})
      return
    }

    res.status(200).json({message:`Here is the tool id: ${id}!`, result })

    
  } catch (error) {
    console.log("  ~ error", error)
    
  }
  // client.close()
}

const getToolsByUsername = async (req, res) => {
  // const { username } = req.params
  // console.log("  ~ req.params", req.params)
  // console.log("  ~ username", username)
  
  // const objectToDb = {
  //   ...req.params,
  //   // _id: "",
  //   email: "",

  //   toolCategorie:"" ,
  //   toolName : ""  ,
  //   toolId :  "" ,
  //   priceOneHour:  "" ,
  //   priceOneDay:  "" ,
  //   toolImageSrc:  ""
  // }

  try {
    const db = await callDb()
    //check if user exists in db
    const userListings = await db.collection("Tools3").find({userName : req.params.username}).toArray()
    // console.log("  ~ userListings", userListings)

    // if not there is no listing for the user
  if(userListings.length === 0){

    // console.log("no listings found !")
    res.status(200).json({status: 200, message: `no listings found for user :${req.params.username}`, userListings})

  }else{
    //if user exists in db and has at least 1 listing send the user tool listing back to FE
    // console.log("  ~ user exists !")
    const userListings = await db.collection("Tools3").find({userName : req.params.username}).toArray()
    // console.log("  ~ toolnames for the user are ", userListings)

    res.status(200).json({status: 200, message: `here are all the listing for the user :${req.params.username}`, userListings })
  }

  } catch (error) {
    console.log("  ~ error", error)
    
  }
  
}

const getToolsByProfession = async(req, res) => {
  
  try {
    
    const db = await callDb()

    const result = await db.collection("Tools3").find({toolCategorie : req.params.profession}).toArray()
    
    res.status(200).json({status: 200, message: `here are all the tools for the profession :${req.params.profession}`, result })


  } catch (error) {
    console.log("  ~ error", error)
    
  }
}

//todo receive toolinfo from newtool component and patch the username:"ouassim2" object with the data
const postTools = async (req, res) => {
  const payLoad = req.body;
  console.log("  ~ payLoad", payLoad)


  const objectToDb = {
    ...payLoad,
    _id: uuidv4(),
    // toolId :  "" , // maybee add uuid if duplicate keys...

    // email: "",

    // toolCategorie:"" ,
    // toolName : ""  ,
    // priceOneHour:  "" ,
    // priceOneDay:  "" ,
    // toolImageSrc:  ""
  }
  
  console.log("  ~ objectToDb", objectToDb)
  
  try{

  const db = await callDb()

  const newUser = await db.collection("Tools3").insertOne(objectToDb)
  
  res.status(200).json({status: 200, message: "received!", objectToDb})


  // if(!newUser){
    // console.log("no users with that username found in db")

    // const result = await db.collection("Tools3").insertOne(objectToDb)
    // console.log("  ~ result", result)
  // }else{

  // }


  }catch(err){
  console.log("  ~ err", err)
  }

  client.close()
}

const getUserProfile = async (req, res) => {
   const {username} = req.params

   try {

    const db = await callDb()
    const userInfo = await db.collection("UsersProfiles").findOne({username})
    // console.log("userInfo", userInfo)

    res.status(200).json({status : 200, userInfo})
    
   } catch (error) {
    console.log("error", error)
    
   }
  // client.close()

};

const editUserProfile = async(req, res) => {
  // will need to check if name profilpic and bg pic keys exist
    // in the database if yes edit them if not create them
    // so we patch them here (add if they dont exist) and fetch them in myprofil to append them
  const {username} = req.params
  // console.log("username", username)

  const {name, profilePicture, bgImage} = req.body

  const objToDB ={
    _id: uuidv4(),
    username,
    ...req.body,
  }

  try {
    
    const db = await callDb()
    
    const result = await db.collection("UsersProfiles").findOne({username})
    // console.log("result", result)
    
    if (!result){
      // console.log("user no exist!")
    const newUser = await db.collection("UsersProfiles").insertOne(objToDB)
    // console.log("added user ", newUser)
    res.status(200).json({status : 200, userInfo : req.body})
    
  }else{
    // console.log("user exist already!")
    const updatedUser = await db.collection("UsersProfiles").updateOne({username}, { $set: {...req.body} })
    // console.log("updatedUser", updatedUser)
    res.status(200).json({status : 200, userInfo : req.body})
    }

  } catch (error) {
    console.log("error", error)
    
  }
  client.close()

}




module.exports = {
  getTools,
  getToolById,
  getToolsByUsername,
  getToolsByProfession,
  postTools,
  getUserProfile,
  editUserProfile,
};