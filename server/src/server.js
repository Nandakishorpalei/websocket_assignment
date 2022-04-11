const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("go to /task  path")
})

const tasks = require("./controller/taskController");
app.use("/task", tasks)


module.exports = app;