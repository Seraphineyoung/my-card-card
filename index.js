const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes");
const API_ROOT_PATH = "/";

app.use(express.json());
app.use(cors());

app.use(API_ROOT_PATH, apiRoutes);

app.get("*", (req, res, next) => {
  if (req.url.startsWith(API_ROOT_PATH)) {
    return next();
  }
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.use(express.static(path.join(__dirname, "crazy-cards-fe/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/crazy-cards-fe/build/index.html"));
});

const userReg = [];

app.post("/usercards", (req, res) => {
  const userdetail = {
    userid: userReg.length + 1,
    name: req.body.name,
    jobtype: req.body.jobtype,
    DOB: req.body.DOB,
    houseNum: req.body.houseNum,
    annualIncome: req.body.annualIncome,
    postcode: req.body.postcode,
    studentLife: req.body.studentLife,
    liquidCard: req.body.liquidCard
  };
  userReg.push(userdetail);

  if (userReg.length > 3) {
    var slicedObj = Object.keys(userReg)
      .map(function(key) {
        return userReg[key];
      })
      .slice(-3);
    res.send(slicedObj);
  } else {
    res.send(userReg);
  }
});

app.get("/usercards", (req, res) => {
  res.send(userReg);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
