"use strict";

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
  
      const result = await db.collection("Tools2").find().toArray();
      console.log("  ~ result", result)
  
      if (result === null) {
        res.status(400).json({status : 400, message:`there are no Tools collection at the moment !`})
        return
      }
      
      res.status(200).json({message:"here are all the tools !", result })
  
    } catch (err) {
      console.log(err.stack);
    } 
      client.close();
  };

module.exports = {
  getTools,
};