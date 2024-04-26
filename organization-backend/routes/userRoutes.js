// // const express = require("express");
// // // const router = express.Router();
// // const Organization = require("../models/organization");

// // // Define your routes here
// // // Example:
// // router.post("/", async (req, res) => {
// //   try {
// //     let userData = {
// //       username: req.body.username,
// //       password: req.body.password,
// //       role: req.body.role,
// //     };
// //     const organization = new Organization(req.body);
// //     await organization.save();
// //     res.status(201).send(organization);
// //   } catch (err) {
// //     res.status(400).send(err);
// //   }
// // });

// const express = require("express");
// const mongoose = require("mongoose");
// const usermodel = require("../models/organization");
// const jwt = require("jsonwebtoken");

// const userroute = express.Router();

// const jwt_secret = "ant";

// userroute.get("/getAllUser", (req, res) => {
//   usermodel.find((err, result) => {
//     if (err) {
//       res.json({ status: 0, error: err });
//     } else {
//       res.json({ status: 1, userlist: result });
//     }
//   });
// });
// userroute.get("/getUser/:id", (req, res) => {
//   usermodel.findOne({ _id: req.params.id }, (err, result) => {
//     if (err) {
//       res.json({ status: 0, error: 1 });
//     } else {
//       if (result == null) {
//         res.json({ status: 0, msg: "user not available" });
//       } else {
//         res.json({ status: 1, msg: "user available", user: result });
//       }
//     }
//   });
// });

// userroute.post("/loginUser", (req, res) => {
//   usermodel.findOne({ email: req.body.email }, (err, result) => {
//     if (err) {
//       res.json({ status: 0, error: 1 });
//     } else {
//       if (result == null) {
//         res.json({ status: 0, msg: "user does not exist" });
//       } else {
//         if (req.body.password == result.password) {
//           res.json({ status: 1, msg: "login success", user: result });
//         } else {
//           res.json({ status: 0, msg: "incorrect password" });
//         }
//       }
//     }
//   });
// });

// userroute.post("/addUser", (req, res) => {
//   // console.log(req.body)
//   let userData = {
//     username: req.body.username,
//     password: req.body.password,
//     role: req.body.role,
//   };
//   usermodel.findOne({ username: req.body.username }, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       if (result == null) {
//         usermodel.insertMany(userData, (err, result) => {
//           if (err) {
//             res.send("user not registered");
//           } else {
//             let token = jwt.sign({ email: result.email }, jwt_secret);
//             console.log(token);
//             res.json({ msg: "Registered", token: token });
//           }
//         });
//       } else {
//         res.json({ msg: "user already registerd" });
//       }
//     }
//   });
// });
// userroute.put("/editUser/:id", (req, res) => {
//   usermodel.update(
//     { _id: req.params.id },
//     { $set: req.body },
//     (err, result) => {
//       if (err) {
//         res.send("data not edited");
//         // res.json({"status":0,"error":1})
//       } else {
//         // res.send("data edited")
//         // res.json({"status":1,"user":result})
//         if (result.modified == 0) {
//           res.json({ status: 0, msg: "user not available" });
//         } else {
//           res.json({ status: 1, msg: "user data editted" });
//         }
//       }
//     }
//   );
// });

// userroute.delete("/deleteUser/:id", (req, res) => {
//   usermodel.deleteOne({ _id: req.params.id }, (err, result) => {
//     if (err) {
//       // res.send("data not deleted")
//       res.json({ status: 0, msg: "user not deleted", error: err });
//     } else {
//       // res.json({"status":1,"user":result})
//       if (result.deletedCount == 0) {
//         res.json({ status: 0, msg: "user not available" });
//       } else {
//         res.json({ status: 1, msg: "user deleted" });
//       }
//     }
//   });
// });
// module.exports = userroute;

// // module.exports = router;
module.exports = (app) => {
  const controllers = require("../controllers/user.controllers");

  const route = require("express").Router();

  route.post("/login", controllers.login);
  route.post("/register", controllers.createUser);
  route.get("/getUserList", controllers.getUserList);
  route.put("/editUser", controllers.editUser);

  app.use("/userApi", route);
};
