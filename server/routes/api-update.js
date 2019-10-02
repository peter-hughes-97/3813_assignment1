module.exports = function(db,app,ObjectID){

    var result;
    app.post('/api/update',function(req,res){

        if (!req.body) {
            return res.sendStatus(400)
        }
        user = req.body;
        var objectid = new ObjectID(user.objid);
        const collection = db.collection('users');
        collection.updateOne({_id:objectid},{$set:{username:user.username,email:user.email,password:user.password}},()=>{
            res.send({'ok':user.objid});
        })
    })
}