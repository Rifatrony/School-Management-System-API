const express = require('express');

const app = express();
const cors = require("cors");
require("./config/db");

const authRouter = require("./routes/admin/auth/auth_routes");
const studentRouter = require("./routes/admin/student/student_routes");
const classRouter = require("./routes/admin/class/admin-routes");
const feesCategoryRouter = require("./routes/admin/fees/fees_route");
const departmentRouter = require("./routes/admin/department/department_route");
const noticetRouter = require("./routes/admin/notice/notice_route");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.set('view engine', 'ejs');

app.use("/api/auth",authRouter);
app.use("/api/student",studentRouter);
app.use("/api/class",classRouter);
app.use("/api/fees", feesCategoryRouter);
app.use("/api/department", departmentRouter);
app.use("/api/notice", noticetRouter);

app.get("/", (req, res)=>{
    res.send("Successfully Running the server")
});

 
app.use((req, res, next) =>{
    res.status(404).json({
        message: "Route not found"
    })
});

app.use((err, req, res, next) =>{
    res.status(500).json({
        message: "Something went wrong"
    })
});

module.exports = app;
