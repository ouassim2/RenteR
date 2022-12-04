const { tools } = require("./Data/dataFinal")
const { clients } = require("./Data/clientData")
// console.log("  ~ Tools", tools)

const { MongoClient } = require("mongodb");

require('dotenv').config({ path: __dirname + '/.env' })
// const { MONGO_URI } = process.env;
const { MONGO_URI_TORONTO } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// apparament we need to use map i use forEach will see ... its map lol

// const result = Object.entries(flights).map(( [key, value] )=>{
  // // db -> Project-Slingair
  // // collection -> flights
  // // documents (objects) -> {flight : "SA231", seats : [{..},{..},{..}]} 
  // //                        {flight : "FD489", seats : [{..},{..},{..}]}
  //  return document = {
    //         _id : key,
    //        flight : key,
    //        seats: value
    //     }
    
    // })
    //  console.log(result) 
    
    
    //  const result = reservations.map(({email,flight,givenName,id,seat,surname})=>{
      // collection -> reservations
      // documents (objects) -> {...}
      //                        {...}
      
      // return {_id:id,flight,seat,givenName,surname,email}
      // })
      
      
      const batchImport = async () => {
        // creates a new client
    // const client = new MongoClient(MONGO_URI, options);
    const client = new MongoClient(MONGO_URI_TORONTO, options);
   
    try {
      // connect...
      console.log("Connecting to DB...")
      await client.connect();

      // declare 'db'
      const db = client.db("RentR");
   
      // declare 'collection'
      // insertMany takes an array of objects
      // each object is a document in the collection !
      
      console.log("inserting documents...")
      await db.collection("Tools3").insertMany(clients);
      
      console.log("Data uploaded Successfully!😁")
    } 
    catch(err) {
      console.log(err.stack);
    }

    // closing the client
    client.close();
    console.log("client Closed ! ✅")

   }

  //  batchImport()