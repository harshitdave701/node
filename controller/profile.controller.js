const ProfileModel = require("../models/profile.model");
const Joi = require("joi");

// Create and Save a new Profile
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Profile Name can not be empty!" });
    return;
  }

  // Create a Profile
  const profile = new ProfileModel({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    skills: req.body.skills
  });

  const schema = Joi.object({
    name: Joi.string().required().label("invalid name"),
    age: Joi.required().label("invalid age"),
    gender: Joi.string().required(),
    skills: Joi.array().required(),
  });
  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(500).send({
      message: error.message,
    });
  }

  // Save Profile in the database
  profile
    .save(profile)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// Retrieve all Countries from the database.
exports.findAll = (req, res) => {
  ProfileModel.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Profile with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ProfileModel.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Profile with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Profile with id=" + id });
    });
};

// Update a Profile by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  ProfileModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Profile with id=${id}. Maybe Profile was not found!`,
        });
      } else res.send({ message: "Profile was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Profile with id=" + id,
      });
    });
};

// Delete a Profile with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ProfileModel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`,
        });
      } else {
        res.send({
          message: "Profile was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Profile with id=" + id,
      });
    });
};
