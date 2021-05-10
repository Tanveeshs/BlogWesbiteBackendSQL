const comFun = require('../../commonFunctions')
const bcrypt = require('bcrypt-node');

module.exports.changePassword = function(req,res,next){
    if(!comFun.strVal(req.body.oldPass)){
        console.error("No oldPass")
        res.json({success:0,message:"Error"})
        return next()
    }else if(!comFun.strVal(req.body.newPass)){
        console.error("No newPass")
        res.json({success:0,message:"Error"})
        return next()
    }else {
        let oldPass = req.body.oldPass;
        let newPass = req.body.newPass;
        let user = res.locals.userId;
        let findQuery = `SELECT * FROM users where user_id=${user}`;
        db.query(findQuery,function (err,result){
            let userObj = result.rows[0];
            if(err){
                console.error("Error:",err);
                res.json({success:0,message:"Error"})
                return next();
            }else {
                if(bcrypt.compareSync(oldPass,userObj.password)){
                    let newHashedPassword = generateHash(newPass);
                    let updQuery = `UPDATE users SET password=${newHashedPassword} WHERE user_id=${user}`
                    db.query(updQuery,function (err){
                            if(err){
                                console.error("Error:",err);
                                res.json({success:0,message:"Error"})
                                return next();
                            }else {
                                res.json({success:1,message:"Password Changed!"})
                            }
                        })
                }else {
                    res.json({success:-10,message:"Password does not match"})
                }
            }
        })
    }
}
function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}