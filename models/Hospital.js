const mongoose = require('mongoose');
const { Schema } = mongoose;

const HospitalSchema = new Schema({
    hospital_name:{
        type: String,
        required: true
    },
    email_id:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    phone_number:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    hospital_registration_number:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    emergency_ward_number:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    registration_certificate:{
        type:String
        // required:true
    },
    hospital_registration_date:{
        type:String,
    },
    available_ambulance:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
    },
    date:{
        type:Date,
        default:Date.now
    },
  });
  const Hospital = mongoose.model('hospital', HospitalSchema);
  module.exports = Hospital;