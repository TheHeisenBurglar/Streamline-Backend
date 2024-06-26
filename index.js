const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { invRouter } = require("./routes/inv.routes");
require("dotenv").config();
const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/inv", invRouter);

app.get("/", (req, res) => {
  res.send({
    message: "api is working now",
  });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
  console.log("Server is running on port number ", port);
});
