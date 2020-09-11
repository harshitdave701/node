module.exports = app => {
    const profile = require("../controller/profile.controller");

    var router = require("express").Router();
  
    // Create a new Profile
    router.post("/", profile.create);
  
    // Retrieve all profile
    router.get("/", profile.findAll);
    
    // Retrieve a single Profile with id
    router.get("/:id", profile.findOne);
  
    // Update a Profile with id
    router.put("/:id", profile.update);
  
    // Delete a Profile with id
    router.delete("/:id", profile.delete);
  
    app.use('/api/profile', router);
  };