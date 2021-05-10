const comFun = require('../../commonFunctions')
const db = require('../../config/database');

module.exports.delBlog = (req,res,next)=>{
    if (!comFun.strVal(req.body.id)) {
        console.log("Error in  fields");
        res.json({success: 0, message: "Error"})
        return next();
    } else {
        const blogId = req.body.id;
        const userId = res.locals.userId;
        let query = `DELETE FROM blogs WHERE blog_id=${blogId} AND user_id=${userId}`
        db.query(query,(err)=>{
            if(err){
                res.json({success:0,message:"Error"})
                return next();
            }else {
                res.json({success:1,message:"Updated"});
                return next();
            }
        })
    }
}