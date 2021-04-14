const express = require("express");
const app = express();
const userlistRouter = require("./static/JS/routes/userlistRouter.js");
const eventRouter = require("./static/JS/routes/eventRouter.js");
const organizerRouter = require("./static/JS/routes/organizerRouter.js");
const sysRouter = require("./static/JS/routes/sysRouter.js");
const adminRouterController = require("./static/JS/routes/adminRouter.js");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/event", eventRouter);
app.use("/org", organizerRouter);
app.use("/user", userlistRouter);
app.use("/system", sysRouter);
app.use("/admin", adminRouterController);

app.use((err, req, res, next) => {
    console.log(err);
    if(err.err) console.log(err.err);
    let code = err.code ? err.code : 500;
    res.status(code).end();
  })

app.use(function(req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(4000);