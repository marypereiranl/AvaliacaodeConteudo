const mongoClient = require("mongodb").MongoClient;

mongoClient.connect("mongodb://localhost")
  .then(conn => global.conn = conn.db("prova"))
  .catch(err => console.log(err));

function findAll() {
  return global.conn.collection("login").find().toArray();
}

function findByLoginPassword(loginData) {
  return global.conn.collection("login").findOne({ login: loginData.login, senha: loginData.senha });
}

function insert(login) {
  return global.conn.collection("login").insertOne(login);
}

function update(login, loginData) {
  return global.conn.collection("login").updateOne({ login: login }, { $set: loginData });
}

function deleteOne(login) {
  return global.conn.collection("login").deleteOne({ login: login });
}

module.exports = { findAll, insert, update, deleteOne, findByLoginPassword }