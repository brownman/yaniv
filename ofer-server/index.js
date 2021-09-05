const express = require("express");

const db = require("./db"); //database connection returns a promise
const service = require("./service");
console.log({ service });
const app = express();

//middelewares:
//allow access req.body middeleware
app.use(express.json());

//catch all errors middleware
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", { error: err });
}

app.get("/", async (req, res, next) => {
  const now = Date.now();
  res.send("time:  " + now);
});

//input: none
//output     [{"Id" : number, "name" : string}]
app.get("/GetEmployeeList", async (req, res, next) => {
  try {
    const result = await service.GetEmployeeList();
    res.send(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//input: /?employeeId=1
//output:
// [
//     {"roleId" : number,"description" : string},
// ]
app.get("/GetEmployeeroles", async (req, res, next) => {
  console.log("req.query", Object.keys(req.query));
  const employeeId = req.query.employeeId;
  if (typeof employeeId === "undefined")
    return res.send("error, please supply a query param: employeeId");
  try {
    const results = await service.GetEmployeeroles(employeeId);
    res.send(results);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//input:{"employeeId" : number,"roleId" : number}
//output: db insert, api info/error message
app.post("/ClockIn", async (req, res, next) => {
  console.log("req.body", req.body);
  const { employeeId, roleId } = req.body;
  try {
    const result = await service.ClockIn(employeeId, roleId);
    res.send(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//start web server listening on port
db.then((connection) => {
  console.log("connection successful");
  service.init(connection);

  app.listen(process.env.NODE_PORT, () => {
    console.log(`listening on port ${process.env.NODE_PORT}`);
  });
}).catch((err) => {
  console.error("connection", err);
  next(err);
});
