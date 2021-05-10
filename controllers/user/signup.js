const comFun = require('../../commonFunctions');
const jwt = require('jsonwebtoken');
const mailer = require('../../utils/mailer');
const bcrypt = require('bcrypt-node');
const db = require('../../config/database');

module.exports.signup = (req,res,next)=> {
    let password = req.body.password;
    let email1 = String.prototype.toLowerCase.apply(req.body.email)
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    if (comFun.strVal(email1) && comFun.strVal(password) && comFun.strVal(firstName) && comFun.strVal(lastName)) {
        let findQuery = `SELECT user_id
                         from users
                         where email = '${email1}'`;
        db.query(findQuery, function (err, result) {
            if (err) {
                console.log(err);
                res.json({success: 0, message: "Error!"})
                return next();
            } else if (result.rowCount === 1) {
                res.json({success: 0, message: "Email Taken"})
                return next();
            } else {
                let hashedPassword = generateHash(password);
                let insertQuery = `INSERT INTO users(email, password, isVerified, firstName, lastName)
                                   VALUES ('${email1}', '${hashedPassword}', false, '${firstName}', '${lastName}')
                                    RETURNING user_id,email`;
                db.query(insertQuery, function (err, resultIns) {
                    if (err) {
                        console.log(err);
                        res.json({success: 0, message: "Error!"})
                        return next();
                    } else {
                        let userId = resultIns.rows[0].user_id;
                        let email = resultIns.rows[0].email;
                        const secret = process.env.verify_mail_secret;

                        let date = Date.now();
                        date += 24 * 60 * 60 * 1000;
                        const payload = {
                            id: userId,
                            email: email,
                            endDate: date,
                        };
                        const token = jwt.sign(payload, secret);
                        let url = 'http://localhost:3000/verify/' + token;
                        let content = `<p>Hey User,</p>
                        <p><br></p>
                        <p>You are just one step away from Meditation For You.</p>
                        <p><br></p>
                        <p><span style="color: rgb(44, 130, 201);"><a href="${url}">Click here</a></span> to Verify your mail and unleash happiness.</p>
                        <p><br></p>
                        <p>If the above link doesn&#39;t work manually paste this link in your browser</p>
                        <p><span style="font-size: 12px;">${url}</span></p>
                        <p><br></p>
                        <p>-Team Meditation For You</p>`;
                        mailer(email, 'Verify your E-Mail Address', content)
                            .on('error', function (s) {
                                console.log(s);
                                res.json({success: -10, message: "Mail not sent"})
                                return next();
                            })
                            .on('done', function () {
                                console.log(url);
                                res.json({success: 1, message: 'Signup Success'});
                                return next()
                            })
                    }
                })

            }
        })
    } else {
        res.json({success: 0, message: "Error!"})
        return next();
    }
}


function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}