const express = require('express');
const Hospital = require('../models/Hospital');
const router = express.Router();
// const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'SecretJSONwebtoken';

router.post('/signup',async (req, res) => {
    // If there are errors, return Bad request and the errors
    try {
      // Check whether the user with this email exists already
      let hospital = await Hospital.findOne({ email_id: req.body.email_id });
      if (hospital) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
      }
      if(req.body.password!=req.body.cpassword){
        return res.status(400).json({ error: "Password and Confirm Password do not match" })
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
  
      // Create a new user
      hospital = await Hospital.create({
        hospital_name: req.body.hospital_name,
        email_id:req.body.email_id,
        address:req.body.address,
        phone_number:req.body.phone_number,
        city:req.body.city,
        hospital_registration_number:req.body.hospital_registration_number,
        state:req.body.state,
        emergency_ward_number:req.body.emergency_ward_number,
        pincode:req.body.pincode,
        registration_certificate:req.body.registration_certificate,
        hospital_registration_date:req.body.hospital_registration_date,
        available_ambulance:req.body.available_ambulance,
        password: secPass,
      });
      const data = {
        hospital: {
          id: hospital.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      let success=true
  
      // res.json(user)
      res.json({ authtoken,success })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })

  router.post('/login', async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
  
    const {hospital_name, email_id, password} = req.body;
    try {
      let hospital = await Hospital.findOne({ email_id });
      if (!hospital) {
        success = false
        return res.status(400).json({ error: "Please try to login with correct credentials" });
      }
  
      const passwordCompare = await bcrypt.compare(password, hospital.password);
      if (!passwordCompare || (hospital_name!=hospital.hospital_name)) {
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }
  
      const data = {
        hospital: {
          id: hospital.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken })
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  
  
  });

  router.get("/gethospitals",async (req, res) => {
    try {
      const hospitals = await Hospital.find({});
      res.json(hospitals);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  });

  module.exports = router