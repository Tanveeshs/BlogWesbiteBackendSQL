const comFun = require('../../commonFunctions');
const db = require('../../config/database');

module.exports.likeBlog = (req,res,next)=>{
    if(!comFun.strVal(req.body.blog) || !comFun.numVal(req.body.like)){
        res.json({success: 0,message:"Error!"});
        console.log("ISS MEIN")
        return next();
    }else {
        let userId = res.locals.userId;
        let blogId = parseInt(req.body.blog);
        let like = parseInt(req.body.like);
        let checkQuery = `
            SELECT * FROM USERS
            WHERE ${blogId}=ANY(liked) AND user_id=${userId}`
        db.query(checkQuery,function (err,result){
            if(err){
                console.log(err)
                res.json({success:0,message:"Error!"});
                return next();
            }else if(result.rowCount!==0){
                res.json({success:-10,message:"Already liked or disliked"});
                return next();
            }else {
                let updQuery=`
                    UPDATE users
                    SET liked=array_append(liked,${blogId})
                    WHERE user_id=${userId};
                    `
                if(like===1){
                    updQuery+=`UPDATE blogs
                    SET liked=liked+1 WHERE blog_id=${blogId};`
                }else {
                    updQuery+= `UPDATE blogs
                    SET dislike=dislike+1 WHERE blog_id=${blogId}`
                }
                console.log(updQuery);
                db.query(updQuery,function (err,insResult){
                    if (err) {
                        console.log(err)
                        res.json({success: 0, message: "Error!"});
                        return next();
                    } else {
                        console.log(insResult)
                        res.json({success: 1, message: "Success"})
                    }
                })
            }
        })
    }
}
