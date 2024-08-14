const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

main()
  .then((res) => {
    console.log("connection is doned..!");
  })
  .catch((err) => {
    //console.log(err);
  });
async function main() {
  mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "66af94b1d863aedbf711f04f",
  }));
  await Listing.insertMany(initdata.data);
  console.log("data saved..!");
};

initDB();
