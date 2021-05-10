
const crypto = require('crypto');
const mail = require('../../utils/mailer');
const comFun = require('../../commonFunctions')
const bcrypt = require('bcrypt-node');
const db = require('../../config/database');

module.exports.updPassword = (req, res,next)=> {
    if(!comFun.strVal(req.body.token)){
        console.error("No token")
        res.json({success:0,message:"Error"})
        return next()
    }
    else if(!comFun.strVal(req.body.password)){
        console.error("No password")
        res.json({success:0,message:"Error"})
        return next()
    }else{
        let token = req.body.token;
        try {
            let decipher = crypto.createDecipher('aes256',"Secret");
            let decrypted = decipher.update(token, 'hex', 'utf8') + decipher.final('utf8');
            let password = generateHash(req.body.password);
            let updQuery = `UPDATE users SET password='${password}' WHERE user_id=${decrypted}`
            db.query(updQuery,function(err, result) {
                    if (err) {
                        res.json({success:0,message:"Sorry there is some error"})
                        return next();
                    }
                    if (result.rowCount === 0) {
                        res.json({success:0,message:"User not found"})
                        return next();
                    } else {
                        let content = '<!DOCTYPE html>\n' +
                            '<html lang="en">\n' +
                            '\n' +
                            '<body class="fr-no-selection">\n' +
                            '    <p>Dear User,</p>\n' +
                            '    <p>Your password has been successfully reset.</p>\n' +
                            '    <p><br></p>\n' +
                            '    <p>If this change wasn&#39;t made by you contact support or mail us at</p>\n' +
                            '    <p>xyz@xyz.tech</p>\n' +
                            '    <p><br></p>\n' +
                            '    <p>-Thank you</p>\n' +
                            '</body>\n' +
                            '\n' +
                            '</html>'
                        //Here we are not checking for email error as it might increase user wait time
                        mail(result.rows[0].email,'Password Changed',content)
                        res.send({success:1,message:"Password changed successfully"});
                        return next();
                    }
                });
        }catch (e) {
            console.error("Wrong Token Error")
            res.json({success:0,message:"Error"})
            return next()
        }
    }
}
function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}