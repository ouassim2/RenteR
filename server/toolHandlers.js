"use strict";

const { json } = require("express");
const { MongoClient } = require("mongodb");


require("dotenv").config({ path: __dirname + "/.env" });
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

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
  console.log("  ~ id", id)


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
  client.close()
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
    const userListings = await db.collection("Tools3").find({userName : req.params.userName}).toArray()
    // console.log("  ~ userListings", userListings)

    // if not there is no listing for the user
  if(userListings.length === 0){

    console.log("no listings found !")
    res.status(200).json({status: 200, message: `no listings found for user :${req.params.userName}`, userListings})

  }else{
    //if user exists in db and has at least 1 listing send the user tool listing back to FE
    // console.log("  ~ user exists !")
    const userListings = await db.collection("Tools3").find({userName : req.params.userName}).toArray()
    // console.log("  ~ toolnames for the user are ", userListings)

    res.status(200).json({status: 200, message: `here are all the listing for the user :${req.params.userName}`, userListings })
  }

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
    // _id: "",
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




module.exports = {
  getTools,
  getToolById,
  getToolsByUsername,
  postTools,
};