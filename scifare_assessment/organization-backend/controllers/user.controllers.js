const express = require("express");
const usermodel = require("../models/user");
const organizationmodel = require("../models/organization");
const jwt = require("jsonwebtoken");
const { set } = require("mongoose");

const jwt_secret = "Assignment";

exports.login = async (req, res) => {
  try {
    let user = await usermodel.findOne({ username: req.body.username });
    if (user != null) {
      if (req.body.password == user.password) {
        var token = jwt.sign({ id: user._id, role: user.role }, jwt_secret);
        res.json({
          status: 1,
          msg: "login success",
          user: user,
          token: token,
        });
      } else {
        res.json({ status: 1, message: "Incorrect password" });
      }
    } else {
      res.json({ status: 0, message: "Entered email does not exist" });
    }
  } catch (err) {
    res.json({ status: 0, message: "Unable to login user", error: err });
  }
};

exports.createUser = async (req, res) => {
  try {
    let exist_user = await usermodel.findOne({
      $or: [{ username: req.body.username }],
    });
    if (exist_user == null) {
      let organization = await organizationmodel.create({
        name: req.body.organization,
      });
      let data = {
        password: req.body.password,
        username: req.body.username,
        role: req.body.role,
        organization: organization._id,
      };
      let user = await usermodel.create(data);
      if (user) {
        res.json({ status: 1, message: "User registered successfully" });
      }
    } else if (exist_user.email == req.body.email) {
      res.json({ status: 0, message: "Entered email already exist" });
    } else if (exist_user.username == req.body.username) {
      res.json({ status: 0, message: "Entered username already exist" });
    } else if (exist_user.mobile == req.body.mobile) {
      res.json({ status: 0, message: "Entered mobile number already exist" });
    }
  } catch (err) {
    if (err.name === "ValidationError") {
      res.json({
        status: 0,
        message: Object.values(err.errors).map((val) => val.message),
      });
    } else {
      res.json({
        status: 0,
        message: "Unable to register new user",
        error: err,
      });
    }
  }
};

exports.getUserList = async (req, res) => {
  try {
    let userList = [];
    let token = req.headers.token;
    let decodedData = jwt.verify(token, jwt_secret);
    if (decodedData) {
      if (decodedData.role == "admin") {
        userList = await usermodel.find().populate("organization");
      } else {
        let user = await usermodel
          .findById(decodedData.id)
          .select("-organization");
        userList.push(user);
      }
      res.json({
        status: 1,
        message: "User list found successfully",
        list: userList,
      });
    } else {
      return res.json({ status: 0, message: "Unauthorized user" });
    }
  } catch (err) {
    res.json({ status: 0, message: "Something went wrong!" });
  }
};

exports.editUser = async (req, res) => {
  try {
    let token = req.headers.token;
    let verified = jwt.verify(token, jwt_secret);
    if (verified) {
      let data = {
        password: req.body.password,
        username: req.body.username,
      };
      let exist_user = await usermodel.findOne({
        $or: [{ username: req.body.username }],
      });
      if (exist_user == null) {
        let update = await usermodel.updateOne({ _id: verified.id }, data);
        res.json({ status: 1, message: "User updated successfully" });
      } else if (exist_user.email == req.body.email) {
        res.json({ status: 0, message: "Entered email already exist" });
      } else if (exist_user.username == req.body.username) {
        res.json({ status: 0, message: "Entered username already exist" });
      }
    } else {
      return res.json({ status: 0, message: "Unauthorized user" });
    }
  } catch (err) {
    res.json({ status: 0, message: "Something went wrong!" });
  }
};
