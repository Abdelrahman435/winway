const {getEmail, getOTP, verify, getEmailInfo} = require('../services/signupService');
const bcrypt = require('bcrypt');

async function verifyUser(req,res){
    if(!await getEmail(req.body.email)){
        return res.status(404).json({msg:"User not found..."});
    }
    const user = await getEmailInfo(req.body.email);
    const otp = await getOTP(user[0].id);
    if(!otp){
        return res.status(404).json({msg:"No OTP was sent..."});
    }
    if(!await bcrypt.compare(req.body.otp, otp[0].otp)){
        return res.status(401).json({msg:"Authentication failed..."});
    }
    const state = await verify(user[0].id);
    if(!state){
        return res.status(500).json({msg:"INTERNAL SERVER ERROR"});
    }
    return res.status(200).json({msg:"Verified Successfully"});
}

module.exports = {verifyUser};

