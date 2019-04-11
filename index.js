const express = require("express");
const app = express();
var cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(cors());

// app.use(express.static(path.join(__dirname, "crazy-cards-fe/build")));
// // Anything that doesn't match the above, send back index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/crazy-cards-fe/build/index.html"));
// });

const userReg = ["hello this must work"];

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
