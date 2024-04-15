const jwt = require("jsonwebtoken");
const Professor = require("../models/professorModel");

const authProfessor = async (req, res, next) => {
  console.log("G");
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, "raj");
    const professor = await Professor.findOne({
      _id: data._id,
    });
    if (professor) throw new Error("already exits");
    // req.professor = professor;
    // req.token = token;
    next();
  } catch (err) {
    res.status(400).send({
      status: 400,
      message: "lack of authentication",
    });
  }
};

module.exports = authProfessor;
