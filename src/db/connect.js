const { MongoClient } = require("mongodb");
const url = "mongodb+srv://mongodb:dharmraj@cluster0.wpsrcnj.mongodb.net/";

const client = new MongoClient(url);

async function show() {
  const result = await client.connect();
  const db = result.db("Prepcode");
  const collection = db.collection("questions");
  console.log("connection successfull");
  const data = await collection.findOne({
    level: "hard",
    lang: "java",
  });
  return collection;
}

show();

module.exports = show;
