module.exports = app => {
    const users = require("../controller/user.controller");
  
    var router = require("express").Router();
  
    // Create || register a new User
    router.post("/register", users.create);
  
    // Retrieve all users
    router.get("/", users.findAll);

    // login user
    router.post("/login", users.login);
    
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
  
    // Update a User with id
    router.put("/:id", users.update);
  
    // Delete a User with id
    router.delete("/:id", users.delete);
  
    app.use('/api/users', router);
  };