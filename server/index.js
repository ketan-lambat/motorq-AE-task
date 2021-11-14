const express = require("express");
const vehicles = require("./routes/vehicles");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use("/api/vehicles", vehicles);

mongoose
  .connect("mongodb://localhost:27017/motorq")
  .then(() => {
    console.log("Motorq connected to db");
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Welcome to Motorq!");
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Motorq Listening on port ${port}`);
});
