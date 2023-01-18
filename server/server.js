"use strict"

// import the needed node_modules.
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")

//-----------------------/api/get-tools-------------------
const { getTools, getToolById, getUserToolListings, getToolsByProfession, getToolsByBrand, postTool, deleteTool, getUserProfile, editUserProfile } = require("./toolHandlers")
//------------------------------------------

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json({size: 1}))
  .use(helmet())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  .get("/api/get-tools", getTools) // get all the tools available for rent!
  .get("/api/get-tool/:id", getToolById) // get a single tool by id

  .get("/api/get-user-tool-listings/:username", getUserToolListings) // get all the tools for that particular username
  .get("/api/get-tools/profession/:profession", getToolsByProfession) // get all the tools for that particular profession
  .get("/api/get-tools/brand/:brand", getToolsByBrand) // get all the tools for that particular profession
  .post("/api/post-tool", postTool) // post a single tool to Db
  .delete("/api/delete-tool:id", deleteTool) // delete a single tool from profil

  .get("/api/get-user-profile/:username", getUserProfile) // get the user profile (name, pic, bg)
  .patch("/api/edit-profile/:username", editUserProfile) // edit the user profile (name, pic, bg)

  .get('/bot-message', (req, res) => {

    let userInput = req.query.text
    // get the message from the user and check if its
    // included in the array commonGreetings


    const getBotMessage = (userInput) => {
      const commonGreetings = ["hi", "hello", "howdy","hey"];
      const commonGoodbyes  = ["bye", "farewell", "so long", "adios", "see you", "ciao", "sayonara", "au revoir" ]
      const address = ["address", "whats your address"]
      const coming = ["coming", "around", "5", "perfect il be there around 5"]
      
      let botMsg = "";
      
      if (commonGreetings.includes(userInput.toLowerCase())) {
        botMsg = "hello";

      } else if (commonGoodbyes.includes(userInput.toLowerCase())) {
        botMsg = "bye"

      } else if (address.includes(userInput.toLowerCase())) {
        botMsg = "we can meet at 2314 Rue Kaufman"
      }
       else if (coming.includes(userInput.toLowerCase())) {
        botMsg = "ok il see you later !"
      }
      return botMsg;
    };


    const message = { author: 'Mr-Roboto', text: `${getBotMessage(userInput)}` };

    const randomTime = Math.floor(Math.random() * 3000);
    
    setTimeout(() => {
      
      res.status(200).json({status: 200, message });

    }, 2000);
    
  })

  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    })
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000...`))
