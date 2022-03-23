const express = require("express");
const router = express.Router();
const User = require('../model/User')

router.get("/", async (req, res) => {
  // const users = await User.find();
  const users = [{
    name: 'xbx',
    age: 18
  }]
  console.log(users);
  res.send(users);
});

module.exports = router;
