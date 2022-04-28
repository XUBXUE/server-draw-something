const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const model = require("../db");

router.get("/getUsers", async (req, res) => {
  // const users = await User.find();
  const sql = "select * from user";
  let [err, data] = await model.query(sql);
  if (err) {
    res.send({ code: 500, msg: "failed" });
  } else {
    res.send({ code: 200, msg: "success", data });
  }
});

router.post("/addUser", async (req, res) => {
  try {
    const { body } = req;
    const sql1 = `SELECT * FROM user WHERE userName = '${body.userName}'`;
    let [err1, data1] = await model.query(sql1);
    if (err1) {
      res.send({ code: 500, msg: "failed" });
    } else {
      if (data1 && data1.length == 0) {
        const sql2 = "INSERT INTO User SET ?";
        let [err, data] = await model.insert(sql2, body);
        if (err) {
          console.log(123)
          res.send({ code: 500, msg: "failed" });
        } else {
          res.send({ code: 200, msg: "success", data });
        }
      } else {
        res.send({ code: 201, msg: "该用户名已被占用！" });
      }
    }
  } catch (err) {
    console.log(2);
  }
});

router.post("/getUserById", async (req, res) => {
  const { query } = req;
  const sql = `SELECT * FROM user WHERE userName = '${query.userName}'`;
  let [err, data] = await model.query(sql);
  if (err) {
    res.send({ code: 500, msg: "failed" });
  } else {
    res.send({ code: 200, msg: "success", data });
  }
});

module.exports = router;
