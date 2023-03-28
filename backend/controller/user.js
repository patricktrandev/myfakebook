let userPg = (req, res) => {
  res.send("welcome user page");
};
let userPg2 = (req, res) => {
  res.send("welcome 2 user page");
};
module.exports = {
  userPg,
  userPg2,
};
