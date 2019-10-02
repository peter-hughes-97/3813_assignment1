module.exports = function(db,app,ObjectID){

    app.post('/api/deleteitem',function(req,res){
        if (!req.body) {
            return res.sendStatus(400);
        }
        deluser = req.body.user;
        //var objectid = new ObjectID(userID.userid);
        const collection = db.collection('users');
        collection.deleteOne({'username':deluser},(err,docs)=>{
            /*
            collection.find({}).toArray((err,data)=>{
                res.send(data);
            });
            */
            res.send({ok:1});
        })
    })
}