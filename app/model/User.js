const model = require("../db");

const getUsers = () => {
  return new Promise(async (res, rej) => {
    try {
      const sql = "SELECT * FROM user";
      let [err, data] = await model.query(sql);
      if (err) {
        rej(false);
      } else {
        res(data);
      }
    } catch (err) {
      rej(err);
    }
  });
};

const getUserById = (id) => {
  return new Promise(async (res, rej) => {
    try {
      const sql = `SELECT * FROM user WHERE id = '${id}'`;
      let [err, data] = await model.query(sql);
      if (err) {
        rej(false);
      } else {
        res(data);
      }
    } catch (err) {
      rej(err);
    }
  });
};

const deleteUserById = (id) => {
  return new Promise(async (res, rej) => {
    try {
      const sql = `DELETE FROM user WHERE id = '${id}'`;
      let [err, data] = await model.delete(sql);
      if (err) {
        rej(false);
      } else {
        res(true);
      }
    } catch (err) {
      rej(err);
    }
  });
};

const addUser = (query) => {
  return new Promise(async (res, rej) => {
    try {
      const sql = "INSERT INTO User SET ?";

      let [err, data] = await model.insert(sql, query);
      if (err) {
        rej(false);
      } else {
        res(true);
      }
    } catch (err) {
      rej(err);
    }
  });
};

module.exports = { getUsers, addUser, getUserById, deleteUserById };
