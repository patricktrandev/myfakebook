const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const app = express();
dotenv.config({ path: "config/config.env" });
const { readdirSync } = require("fs");
const swaggerDocumentation = require("./helpers/documentation");
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/apifbdocs", swaggerUi.serve);
app.use("/apifbdocs", swaggerUi.setup(swaggerDocumentation));
// read all files in route dynamically
readdirSync("./routes").map((r) =>
  app.use("/api/v1", require("./routes/" + r))
);

//DB CONNECTION
mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
