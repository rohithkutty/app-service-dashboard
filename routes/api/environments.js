const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Load Environment model
const Environment = require("../../models/Environments");

// @route   GET api/environment/test
// @desc    Tests Environment route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Environment Works" }));

// @route   POST api/environment/machine
// @desc    Add machine to Environment
// @access  Private

router.post("/machine", (req, res) => {
  // console.log(req.body);
  Environment.findOne({ release: req.body.release }).then(env => {
    var envName = req.body.environment;
    var machineName = req.body.machineName;
    if (env) {
      const newExp = {};
      newExp[req.body.machineName] = {};
      //Add to environments array
      env.environment[envName].push({ [req.body.machineName]: { environmentName: envName } });

      // console.log("env response", env);
      console.log(env, "NEW ENV")
      env.save().then(env => res.json(env));
    } else {
      const newRelease = new Environment({
        release: req.body.release,
        environmet: {
          PUT: [],
          SIT: [],
          ST: []
        }
      });
      const newExp = {};
      newExp[req.body.machineName] = {};
      //Add to environments array
      newRelease.environment[envName].push({ [req.body.machineName]: { environmentName: envName } });

      console.log(newRelease, "NEW RELEASE");

      // newRelease.environment[envName][machineName] = {};

      // console.log(machineName, "fydghjkjhgfdfghjhgfghj");

      newRelease
        .save()
        .then(env => res.json(env))
        .catch(err => console.log(err));
    }
  });
});

// @route   DELETE api/environment/machine/:exp_id
// @desc    Delete machine from environment
// @access  Private

router.delete("/machine/:mac_id", (req, res) => {
  Environment.findOne({ env: req.env.id }).then(env => {
    // Get remove index
    const removeIndex = env.environment
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    //splice out of an array
    env.environment.splice(removeIndex, 1);

    //re-save the env
    env
      .save()
      .then(env => res.json(env))
      .catch(err => res.status(404).json(err));
  });
});

module.exports = router;
