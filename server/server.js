"use strict"

// import the needed node_modules.
const express = require("express")
const helmet = require("helmet")
const morgan = require("morgan")

//-----------------------/api/get-tools-------------------
const { getTools, getToolById, getToolsByUsername, postTools } = require("./toolHandlers")
//------------------------------------------

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())
  .use(helmet())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  .get("/api/get-tools", getTools) // get all he tools available for rent!
  .get("/api/get-tool/:id", getToolById) // get a single tool by id

  .get("/api/get-tools/:userName", getToolsByUsername) // get all the tools for that particular username
  .post("/api/post-tools", postTools) // post a single tool to Db

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
