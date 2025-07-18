const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));

const programList = require("./programList.json");
app.get("/programList", (req, res) => {
    res.json(programList);
});

app.listen(8080, ()=>{
    console.log("Server started on port 8080");
});
