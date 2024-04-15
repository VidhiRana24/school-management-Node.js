const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const studentsRouter = require("./routers/studentRouter");
const professorsRouter = require("./routers/professorRouter");
const userRouter = require("./routers/userRouter");
const db = require("./db/db");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(studentsRouter);
app.use(professorsRouter);
app.use(userRouter);
app.listen(port, () => {
  console.log("server runs, port:", process.env.PORT);
  db(process.env.SMS_MONGODB_URL);
});
