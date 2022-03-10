const express = require("express");
const router = require("./routes/auth");
const cors = require("cors");
const { connect } = require("mongoose");
const app = express();

let database = async () => {
  await connect("mongodb://localhost:27017/socket");
  console.log("mongodb connected");
};
database();

// middlewar
app.use(cors());
app.use(express.json());
app.use("/api/auth", router);

app.listen(4000, err => {
  if (err) throw err;
  console.log("server is listening on 4000");
});
