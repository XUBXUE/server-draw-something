const mysql = require("mysql");

const config = {
  host: "localhost", // 域名
  port: 3306, // 端口
  user: "root", //用户名
  password: "123456", // 密码
  connectTimeout: 5000, //连接超时
  database: "draw_something",
};

class Db {
  constructor() {
    this.connect = mysql.createConnection(config);
    this.connect.connect((err) => {
      if (err) {
        console.log("数据库连接失败");
      } else {
        console.log("数据库连接成功");
      }
    });
  }

  // 查询
  query(sql) {
    const p = new Promise((resolve, reject) => {
      this.connect.query(sql, (err, result) => {
        if (err) {
          reject([err, null]);
        } else {
          resolve([null, result]);
        }
      });
    });
    return p;
  }

  insert(sql, params) {
    const p = new Promise((resolve, reject) => {
      this.connect.query(sql, params, (err, result) => {
        if (err) {
          reject([err, null]);
        } else {
          resolve([null, result]);
        }
      });
    });
    return p;
  }

  delete(sql) {
    const p = new Promise((resolve, reject) => {
      this.connect.query(sql, (err, result) => {
        if (err) {
          reject([err, null]);
        } else {
          resolve([null, result]);
        }
      });
    });
    return p;
  }
}

let db = new Db();
module.exports = db;
