const comFun = require('../../commonFunctions');
const db = require('../../config/database');

module.exports.addComment = (req,res,next)=>{
    if (!comFun.strVal(req.body.comment)|| !comFun.strVal(req.body.blog)) {
        console.log("Error in  fields");
        res.json({success: 0, message: "Error"})
        return next();
    } else {
        const comment = req.body.comment;
        const userId = parseInt(res.locals.userId);
        const blogId = parseInt(req.body.blog);
        let insertQuery = `INSERT INTO comments(blog_id,user_id,comment)
                           VALUES(${blogId},${userId},'${comment}')`
        db.query(insertQuery,function (err) {
            if (err) {
                console.error(err)
                res.json({success: 0, message: "ERROR"})
                return next();
            } else {
                res.json({success: 1, message: "Success"})
                return next();
            }
        })
    }
}