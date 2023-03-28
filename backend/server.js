const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/user");

const { readdirSync } = require("fs");
dotenv.config();
app.use(cors());
// read all files in route dynamically
readdirSync("./routes").map((r) =>
  app.use("/api/v1", require("./routes/" + r))
);

//DB CONNECTION
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("error in connecting DB", err);
  });

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}...`);
});
