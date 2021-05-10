const comFun = require('../../commonFunctions');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const db = require('../../config/database');
const bcrypt = require('bcrypt-node');

module.exports.login = (req,res,next)=>{
    if(!comFun.strVal(req.body.email)|| !comFun.strVal(req.body.password)){
        res.json({success:0,message:"Error!"});
        return next();
    }else {
        let email = String.prototype.toLowerCase.apply(req.body.email);
        let password = req.body.password;
        let findQuery = `SELECT * from users where email = '${email}'`;
        db.query(findQuery,function (err,result){
            if(err){
                console.log(err);
                res.json({success: 0,message:"Error!"});
                return next();
            }
            else if(result.rowCount===0){
                res.json({success: 0,message:"User not found."});
                return next();
            }else {
                let userPass = result.rows[0].password;
                if(validPassword(password,userPass)){
                    let userId = result.rows[0].user_id;
                    let admin = result.rows[0].admin;
                    let isVerified = result.rows[0].isverified;

                    let userData = result.rows[0];
                    let obj = {
                        userId:userId,
                        admin: admin,
                        expiry_date:moment().add(1,"week").format("YYYY-MM-DDTHH:mm:ss.SSS")
                    }
                    if(isVerified){
                        let token = jwt.sign(obj,"Secret");
                        res.json({success:1,message:"Success",user:userData,token:token});
                        return next();
                    } else {
                        res.json({success:-10,message:"Not verified"});
                        return next();
                    }
                }else {
                    res.json({success:0,message:"Invalid password."})
                    return next();
                }
            }
        })
    }

}
function validPassword(password,hash) {
    return bcrypt.compareSync(password, hash);
}