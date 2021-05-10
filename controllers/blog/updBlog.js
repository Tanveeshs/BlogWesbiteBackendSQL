const comFun = require('../../commonFunctions')
const db = require('../../config/database');
module.exports.updBlog = (req,res,next)=>{
    if (!comFun.strVal(req.body.id)) {
        console.log("Error in  fields");
        res.json({success: 0, message: "Error"})
        return next();
    } else {

        const blogId = req.body.id;
        const userId = res.locals.userId;
        let updQuery = `UPDATE blogs SET status=2`;
        let updObj={};
        updObj.$set = {};
        updObj.$set.status =2;
        let isUpd = false;
        if(comFun.strVal(req.body.content)){
            updQuery+=`SET content=${req.body.content}`
            isUpd = true;
        }
        if(comFun.strVal(req.body.title)){
            updQuery+=`SET title=${req.body.title}`
            isUpd = true;
        }
        if(comFun.strVal(req.body.image)){
            updQuery+=`SET image=${req.body.image}`
            isUpd = true;
        }
        if(comFun.strVal(req.body.thumbnail)){
            updQuery+=`SET thumbnail=${req.body.thumbnail}`
            isUpd = true;
        }


        if(isUpd){
            updQuery+=`WHERE user_id=${userId} AND blog_id=${blogId}`
            db.query(updQuery,function (err){
                if(err){
                    res.json({success:0,message:"Error"})
                    return next();
                }else {
                    res.json({success:1,message:"Updated"});
                    return next();
                }
            })
        }else {
            res.json({success:-10,message:"No fields passed"})
            return next()
        }
    }
}