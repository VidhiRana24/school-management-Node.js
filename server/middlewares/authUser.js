const jwt = require("jsonwebtoken");
const Student = require("../models/studentModel");
const Professor = require("../models/professorModel");

const authUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(
      token,
      "ef3ee8a527ee80718e822c040d24998b833aba902e26e3adce3b571786f9a39753f60cfa1917d26df04b03df8ca29cb851f3b81559782445d15e6a10ec630005"
    );
    const user =
      (await Student.findOne({
        _id: data._id,
        "tokens.token": token,
      })) ||
      (await Professor.findOne({
        _id: data._id,
        "tokens.token": token,
      }));

    if (!user) throw new Error("user not authrized");

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

module.exports = authUser;
